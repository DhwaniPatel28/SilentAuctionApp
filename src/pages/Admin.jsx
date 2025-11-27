import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminPanel() {
  const [items, setItems] = useState([]);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    };
    fetchItems();
  }, []);

  // Close auction for an item
  const handleClose = async (item) => {
    try {
      const itemRef = doc(db, "items", item.id);
      await updateDoc(itemRef, { isOpen: false });
      alert(`Auction for "${item.title}" closed! Winner: ${item.currentWinner || "No bids"}`);
      // Update local state
      setItems(items.map(i => i.id === item.id ? { ...i, isOpen: false } : i));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel - Close Auctions</h2>
      {items.map(item => (
        <div key={item.id} style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.image && <img src={item.image} alt={item.title} width="150" />}
          <p><strong>Current Bid:</strong> ${item.currentBid}</p>
          <p><strong>Top Bidder:</strong> {item.currentWinner || "No bids yet"}</p>
          {item.isOpen ? (
            <button onClick={() => handleClose(item)}>Close Auction</button>
          ) : (
            <p style={{ color: "red" }}>Auction Closed</p>
          )}
        </div>
      ))}
    </div>
  );
}
