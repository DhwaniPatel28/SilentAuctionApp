import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot, updateDoc, query, where } from "firebase/firestore";
import Navbar from "./Navbar";
import { useAuth } from "../context/authenticateContext";

export default function Profile() {
  const { currentUser } = useAuth();
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "items"), where("addedBy", "==", currentUser.email));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyItems(itemsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleToggleAuction = async (item) => {
    const itemRef = doc(db, "items", item.id);
    await updateDoc(itemRef, { isOpen: !item.isOpen });
  };

  const handleDeleteItem = async (item) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "items", item.id));
  };

  if (!currentUser) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h3>Please log in to see your profile.</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-info">Profile</h2>
        <p><strong>Username:</strong> {currentUser.email}</p>

        <h4 className="mt-4">Your Listings</h4>
        {myItems.length === 0 && <p className="text-muted">You haven't added any items yet.</p>}

        <div className="row">
          {myItems.map(item => (
            <div className="col-md-6 mb-3" key={item.id}>
              <div className="card shadow-sm">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top"
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center text-muted"
                    style={{ height: "200px", backgroundColor: "#e9ecef" }}
                  >
                    Image Preview
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><strong>Current Bid:</strong> ${item.currentBid}</p>
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${item.isOpen ? "bg-success" : "bg-secondary"}`}>
                      {item.isOpen ? "Open" : "Closed"}
                    </span>
                  </p>
                  <button 
                    className={`btn ${item.isOpen ? "btn-warning" : "btn-success"} me-2`}
                    onClick={() => handleToggleAuction(item)}
                  >
                    {item.isOpen ? "Close Auction" : "Re-open Auction"}
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDeleteItem(item)}
                  >
                    Remove Listing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
