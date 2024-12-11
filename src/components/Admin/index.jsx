import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../../firebase/connection';

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !imageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, {
        name,
        description,
        price, // Send price as a string
        imageUrl,
      });
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition mb-6"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add Product"}
      </button>
      {showForm && (
        <form
          className="bg-gray-100 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
