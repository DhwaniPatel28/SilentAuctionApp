import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, updateDoc, doc, onSnapshot } from "firebase/firestore";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({}); // track bid input per item

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  // Handle bid placement
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
      // Clear input
      setBidAmounts(prev => ({ ...prev, [item.id]: "" }));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Auction Items</h2>
      {items.map(item => (
        <div key={item.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.image && <img src={item.image} alt={item.title} width="150" />}
          <p><strong>Current Bid:</strong> ${item.currentBid}</p>
          <p><strong>Top Bidder:</strong> {item.currentWinner || "No bids yet"}</p>

          {item.isOpen && (
            <div>
              <input
                type="number"
                placeholder="Your bid"
                value={bidAmounts[item.id] || ""}
                onChange={(e) =>
                  setBidAmounts(prev => ({ ...prev, [item.id]: e.target.value }))
                }
              />
              <button onClick={() => handleBid(item)}>Place Bid</button>
            </div>
          )}
          {!item.isOpen && <p style={{ color: "red" }}>Auction Closed</p>}
        </div>
      ))}
    </div>
  );
}
