import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Navbar from "./Navbar";

export default function Leaderboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (ts) => {
    if (!ts) return "";
    return ts.toDate().toLocaleString();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary fw-bold">Auction Leaderboard</h2>

        {items.length === 0 ? (
          <p className="text-center">No items yet.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="mb-5">
              <h4 className="text-success">{item.title}</h4>
              {item.bidHistory && item.bidHistory.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Bidder</th>
                      <th>Amount</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.bidHistory
                      .slice()
                      .sort((a, b) => b.amount - a.amount) 
                      .map((bid, index) => (
                        <tr key={index} className={bid.email === item.currentWinner ? "table-warning" : ""}>
                          <td>{index + 1}</td>
                          <td>{bid.email}</td>
                          <td>${bid.amount}</td>
                          <td>{formatDate(bid.timestamp)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No bids yet.</p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
