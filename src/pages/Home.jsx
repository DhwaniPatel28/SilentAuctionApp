import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../context/authenticateContext";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData.slice(0, 3));
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="display-4 fw-bold text-info mb-3 text-center">Welcome to the Silent Auction!</h1>
        {currentUser ? (
          <p className="lead text-light text-center mb-4">Hello, {currentUser.email}!</p>
        ) : (
          <p className="lead text-light text-center mb-4">You are not logged in. <Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
        )}

        <h3 className="text-info mb-3">Live Auction Preview</h3>
        <div className="row">
          {items.map(item => (
            <div key={item.id} className="col-md-4 mb-3">
              <div className="card bg-secondary text-light h-100">
                {item.image && <img src={item.image} className="card-img-top" alt={item.title} />}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p><strong>Current Bid:</strong> ${item.currentBid}</p>
                  <Link to="/items" className="btn btn-sm btn-info mt-auto">Place a Bid</Link>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-light">No active items yet.</p>}
        </div>
      </div>
    </>
  );
}
