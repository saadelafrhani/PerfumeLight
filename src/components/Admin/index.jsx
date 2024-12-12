import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/connection";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [heading, setHeading] = useState("");  // Manage the heading input
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [imageLinks, setImageLinks] = useState(["", "", ""]);
  const [titles, setTitles] = useState(["", "", ""]);

  // Handle adding product
  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    // Log input values
    console.log(name, description, price, imageUrl);  // Check form values

    if (!name || !description || !price || !imageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, { name, description, price, imageUrl });
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding product:", error.message); // Detailed error logging
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding images
  const handleSubmitImages = async (e) => {
  e.preventDefault();

  console.log(imageLinks, titles, heading);  // Log state values before submit

  if (imageLinks.some((link) => !link) || titles.some((title) => !title) || !heading) {
    alert("Please fill in all image links, titles, and heading.");
    return;
  }

  setLoading(true);
  try {
    const adsCollection = collection(db, "headads");

    // Loop through imageLinks and titles to add documents one by one
    for (let i = 0; i < imageLinks.length; i++) {
      console.log(`Adding Image ${i + 1}:`, {
        imageUrl: imageLinks[i],
        title: titles[i],
        heading,
      });

      await addDoc(adsCollection, {
        imageUrl: imageLinks[i],
        title: titles[i],
        heading,
      });
    }

    alert("Images added successfully!");
    setImageLinks(["", "", ""]);
    setTitles(["", "", ""]);
    setHeading("");
  } catch (error) {
    console.error("Error adding images:", error.message);  // Log detailed error message
    alert("Failed to add images. Please try again.");
  } finally {
    setLoading(false);
  }
};

// Handle Image link and title changes dynamically
const handleImageLinkChange = (e, idx) => {
  const updatedLinks = [...imageLinks];
  updatedLinks[idx] = e.target.value;
  setImageLinks(updatedLinks);
};

const handleTitleChange = (e, idx) => {
  const updatedTitles = [...titles];
  updatedTitles[idx] = e.target.value;
  setTitles(updatedTitles);
};



  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      {/* Toggle buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Product Form" : "Add Product"}
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          onClick={() => setShowImageForm(!showImageForm)}
        >
          {showImageForm ? "Hide News Form" : "Add News"}
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <form className="bg-gray-100 p-6 rounded-lg shadow-md" onSubmit={handleSubmitProduct}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">Image URL</label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}

      {/* Images Form */}
      {showImageForm && (
        <form className="bg-gray-100 p-6 rounded-lg shadow-md" onSubmit={handleSubmitImages}>
          {/* Heading Input */}
          <div className="mb-4">
            <label htmlFor="heading" className="block text-gray-700 font-medium mb-2">Heading</label>
            <input
              id="heading"
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Image Inputs */}
          {imageLinks.map((_, idx) => (
            <div className="mb-4" key={idx}>
              <label htmlFor={`image-${idx}`} className="block text-gray-700 font-medium mb-2">{`Image ${idx + 1} URL`}</label>
              <input
                id={`image-${idx}`}
                type="url"
                value={imageLinks[idx]}
                onChange={(e) =>
                  setImageLinks(imageLinks.map((link, i) => (i === idx ? e.target.value : link)))
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
              <label htmlFor={`title-${idx}`} className="block text-gray-700 font-medium mb-2">{`Image ${idx + 1} Title`}</label>
              <input
                id={`title-${idx}`}
                type="text"
                value={titles[idx]}
                onChange={(e) =>
                  setTitles(titles.map((title, i) => (i === idx ? e.target.value : title)))
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className={`w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add News"}
          </button>
        </form>
      )}

    </div>
  );
};

export default Admin;
