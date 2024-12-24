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
  const [showOrders, setShowOrders] = useState(false);
  const [imageLinks, setImageLinks] = useState(["", "", ""]);
  const [titles, setTitles] = useState(["", "", ""]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    if (showForm) {
      const fetchProducts = async () => {
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setProducts(productList);
      };

      fetchProducts();
    }
  }, [showForm]);

  // Fetch image links
  useEffect(() => {
    if (showImageForm) {
      const fetchNews = async () => {
        const adsCollection = collection(db, "headads");
        const adsSnapshot = await getDocs(adsCollection);
        const adsList = adsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setImageLinks(adsList);
      };

      fetchNews();
    }
  }, [showImageForm]);

  // Fetch orders from Firestore (Only once)
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const orderSnapshot = await getDocs(ordersCollection);
      const orderList = orderSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setOrders(orderList);
    };

    if (orders.length === 0) {
      fetchOrders();
    }
  }, [orders.length]);

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
      setShowForm(false);
    } catch (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete actions
  const handleDelete = async (collectionName, itemId, stateSetter, stateArray) => {
    const docRef = doc(db, collectionName, itemId);
    try {
      await deleteDoc(docRef);
      alert(`${collectionName.slice(0, -1)} deleted successfully!`);
      stateSetter(stateArray.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(`Error deleting ${collectionName.slice(0, -1)}:`, error.message);
      alert(`Failed to delete ${collectionName.slice(0, -1)}.`);
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

  // Handle dynamic changes for Image Links and Titles
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
    <div className="flex justify-center min-h-screen p-5">
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
          <button
            className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition"
            onClick={() => setShowOrders(!showOrders)} 
          >
            {showOrders ? "Hide Orders" : "See Orders"}
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
                  <li key={product.id} className="bg-gray-100 p-4 rounded-lg mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-gray-700">{product.description}</p>
                      <p className="text-gray-500">{`Price: $${product.price}`}</p>
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleDelete("products", product.id, setProducts, products)}
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

        {/* Show Orders
        {showOrders && orders.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl text-center font-semibold mb-4">All Orders</h2>
            <ul className="flex flex-wrap gap-4 justify-center">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="bg-black border-2 border-white p-4 rounded-lg mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <div className="flex flex-col">
                    <h3 className="font-bold text-lg text-white">Phone: {order.phone}</h3>
                    <p className="text-white">Product Name: {order.productName}</p>
                    <p className="text-white">Product Image: {order.productImage}</p>
                    <p className="text-white">Order ID: {order.id}</p>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      onClick={() => handleDelete("orders", order.id, setOrders, orders)}
                    >
                      Delete Order
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )} */}

        

        {/* Add Product Form */}
        {showForm && (
          <form onSubmit={handleSubmitProduct} className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        )}

        {/* Add News Form */}
        {showImageForm && (
          <form onSubmit={handleSubmitImages} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            {imageLinks.map((link, idx) => (
              <div key={idx} className="flex gap-4">
                <input
                  type="text"
                  placeholder={`Image URL ${idx + 1}`}
                  value={link}
                  onChange={(e) => handleImageLinkChange(e, idx)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder={`Title ${idx + 1}`}
                  value={titles[idx]}
                  onChange={(e) => handleTitleChange(e, idx)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
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
