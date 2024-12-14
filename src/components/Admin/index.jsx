import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/connection";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [imageLinks, setImageLinks] = useState(["", "", ""]);
  const [titles, setTitles] = useState(["", "", ""]);
  const [products, setProducts] = useState([]);  // Store all products

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProducts(productList);
    };

    if (showForm) {
      fetchProducts();  // Fetch products when the form is visible
    }
  }, [showForm]);

  // Handle adding product
  const handleSubmitProduct = async (e) => {
    e.preventDefault();

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
      setShowForm(false);  // Hide the form after successful submission
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting product
  const handleDeleteProduct = async (productId) => {
    const productDoc = doc(db, "products", productId);
    try {
      await deleteDoc(productDoc);
      alert("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== productId));  // Remove deleted product from state
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("Failed to delete product.");
    }
  };

  // Handle adding images
  const handleSubmitImages = async (e) => {
    e.preventDefault();

    if (imageLinks.some((link) => !link) || titles.some((title) => !title) || !heading) {
      alert("Please fill in all image links, titles, and heading.");
      return;
    }

    setLoading(true);
    try {
      const adsCollection = collection(db, "headads");

      for (let i = 0; i < imageLinks.length; i++) {
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
      console.error("Error adding images:", error.message);
      alert("Failed to add images.");
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
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

        {/* Toggle buttons */}
        <div className="flex gap-4 mb-6 justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Products" : "See Products"}
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            onClick={() => setShowImageForm(!showImageForm)}
          >
            {showImageForm ? "Hide News Form" : "Add News"}
          </button>
        </div>

        {/* Show Products */}
        {showForm && (
          <div className="mb-6">
            <h2 className="text-2xl text-center font-semibold mb-4">All Products</h2>
            <ul className="flex flex-wrap gap-4 justify-center">
              {products.length === 0 ? (
                <p>No products available.</p>
              ) : (
                products.map((product) => (
                  <li
                    key={product.id}
                    className="bg-gray-100 p-4 rounded-lg mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    {/* Product Image */}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />

                    {/* Product Info */}
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-gray-700">{product.description}</p>
                      <p className="text-gray-500">{`Price: $${product.price}`}</p>
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {/* Product Form */}
        {showForm && (
          <form className=" p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mx-auto flex justify-center flex-col rounded-lg shadow-md" onSubmit={handleSubmitProduct}>
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
            {imageLinks.map((link, idx) => (
              <div className="mb-4" key={idx}>
                <label htmlFor={`imageLink-${idx}`} className="block text-gray-700 font-medium mb-2">{`Image Link ${idx + 1}`}</label>
                <input
                  id={`imageLink-${idx}`}
                  type="url"
                  value={link}
                  onChange={(e) => handleImageLinkChange(e, idx)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
                <label htmlFor={`title-${idx}`} className="block text-gray-700 font-medium mb-2">{`Title ${idx + 1}`}</label>
                <input
                  id={`title-${idx}`}
                  type="text"
                  value={titles[idx]}
                  onChange={(e) => handleTitleChange(e, idx)}
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
              {loading ? "Adding..." : "Add Images"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Admin;
