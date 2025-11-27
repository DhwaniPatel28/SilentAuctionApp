import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import Navbar from "./Navbar";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleBid = async (item) => {
    const bidAmount = Number(bidAmounts[item.id]);
    if (!auth.currentUser) {
      alert("You must be logged in to place a bid!");
      return;
    }

    if (bidAmount <= item.currentBid) {
      alert("Bid must be higher than current top bid!");
      return;
    }

    try {
      const itemRef = doc(db, "items", item.id);
      await updateDoc(itemRef, {
        currentBid: bidAmount,
        currentWinner: auth.currentUser.email
      });
      setBidAmounts(prev => ({ ...prev, [item.id]: "" }));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary fw-bold">Silent Auction</h2>
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100 border-primary">
              {item.image && <img src={item.image} className="card-img-top" alt={item.title} />}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-success">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p><strong>Current Bid:</strong> <span className="text-warning">${item.currentBid}</span></p>
                <p><strong>Top Bidder:</strong> <span className="text-info">{item.currentWinner || "No bids yet"}</span></p>

                {item.isOpen ? (
                  <div className="d-flex mt-auto">
                    <input
                      type="number"
                      placeholder="Your bid"
                      value={bidAmounts[item.id] || ""}
                      onChange={(e) =>
                        setBidAmounts(prev => ({ ...prev, [item.id]: e.target.value }))
                      }
                      className="form-control me-2 border-success"
                      style={{ width: "100px" }}
                    />
                    <button onClick={() => handleBid(item)} className="btn btn-success">
                      Place Bid
                    </button>
                  </div>
                ) : (
                  <p className="text-danger fw-bold mt-2">Auction Closed</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
