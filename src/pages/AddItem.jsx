import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import { auth } from "../firebase";

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
        isOpen: true,
        addedBy: auth.currentUser.email 
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
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-info mb-4 text-center">Add Auction Item</h2>
        <div className="row">
          {/* Form Panel */}
          <div className="col-md-6 mb-4">
            <div className="card p-4 shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter item title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter item description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-info w-100 fw-bold">
                  Add Item
                </button>
              </form>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="col-md-6 mb-4">
            <h5 className="text-info mb-3">Preview</h5>
            <div className="card shadow-sm" style={{ minHeight: "300px" }}>
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "500px", width: "100%" }}
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
                <h5 className="card-title">{title || "Item Title"}</h5>
                <p className="card-text">{description || "Item Description"}</p>
                <p className="card-text text-muted">Current Bid: $0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
