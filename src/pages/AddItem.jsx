import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "items"), {
        title,
        description,
        image,
        currentBid: 0,
        currentWinner: "",
        isOpen: true
      });
      alert("Item added!");
      setTitle("");
      setDescription("");
      setImage("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Auction Item</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <textarea 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea><br />
        <input 
          type="text" 
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        /><br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
