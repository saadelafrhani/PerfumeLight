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
  const [showOrders, setShowOrders] = useState(false); // Added state for orders visibility
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
      const orderList = orderSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setOrders(orderList);
    };

    // Fetch orders only if it's not already fetched
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
  const handleDeleteNews = async (newsId) => {
    const newsDoc = doc(db, "headads", newsId);
    try {
      await deleteDoc(newsDoc);
      alert("News deleted successfully!");
      setImageLinks(imageLinks.filter((news) => news.id !== newsId));
    } catch (error) {
      console.error("Error deleting news:", error.message);
      alert("Failed to delete news.");
    }
  };

  // Handle deleting product
  const handleDeleteProduct = async (productId) => {
    const productDoc = doc(db, "products", productId);
    try {
      await deleteDoc(productDoc);
      alert("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("Failed to delete product.");
    }
  };

  // Handle deleting order
  const handleDeleteOrder = async (orderId) => {
    const orderDoc = doc(db, "orders", orderId);
    try {
      await deleteDoc(orderDoc);
      alert("Order deleted successfully!");
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error.message);
      alert("Failed to delete order.");
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
            onClick={() => setShowOrders(!showOrders)} // Toggle visibility of orders
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
                  <li
                    key={product.id}
                    className="bg-gray-100 p-4 rounded-lg mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
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

        {/* Show Orders */}
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
                    <p className="text-white">Quantity: {order.quantity}</p>
                    <p className="text-white">Size: {order.size}</p>
                    <p className="text-white">Timestamp: {new Date(order.timestamp).toLocaleString()}</p>
                    <p className="text-white">User Name: {order.userName}</p>
                    <button
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Form */}
        {showForm && (
          <form
            className="p-6 w-full sm:w-1/2 md:w-1/3 mx-auto shadow-lg border rounded-lg font-black bg-white"
            onSubmit={handleSubmitProduct}
          >
            <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              className="w-full p-3 mb-4 border rounded-md"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product Description"
              className="w-full p-3 mb-4 border rounded-md"
            />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Product Price"
              className="w-full p-3 mb-4 border rounded-md"
            />
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Image URL"
              className="w-full p-3 mb-4 border rounded-md"
            />
            <button
              type="submit"
              className={`w-full p-3 rounded-md ${loading ? 'bg-gray-500' : 'bg-green-500'} text-white font-bold`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        )}


        {showImageForm && (
          <div className="mb-6">
            <h2 className="text-2xl text-center font-semibold mb-4">All News</h2>
            <ul className="flex flex-wrap gap-4 justify-center">
              {imageLinks.length === 0 ? (
                <p>No news available.</p>
              ) : (
                imageLinks.map((news, idx) => (
                  <li key={news.id} className="bg-gray-100 p-4 rounded-lg mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <img
                      src={news.imageUrl}
                      alt={news.title}
                      className="w-full h-48 object-cover mb-4 rounded-md"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg">{news.title}</h3>
                      <p className="text-gray-700">{news.heading}</p>
                      <button
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleDeleteNews(news.id)}
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

        {/* Image News Form */}
        {showImageForm && (
          <form
            className="p-6 w-full sm:w-1/2 md:w-1/3 mx-auto shadow-lg border rounded-lg bg-white"
            onSubmit={handleSubmitImages}
          >
            <h2 className="text-2xl font-bold text-center mb-4 text-black">Add News Images</h2>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Heading"
              className="w-full p-3 font-black mb-4 border rounded-md text-black"
            />
            {imageLinks.map((link, idx) => (
              <div key={idx} className="mb-4">
                <input
                  type="url"
                  value={link} j
                  onChange={(e) => handleImageLinkChange(e, idx)}
                  placeholder={`Image ${idx + 1} URL`}
                  className="w-full font-black p-3 border rounded-md text-black"
                />
                <input
                  type="text"
                  value={titles[idx]}
                  onChange={(e) => handleTitleChange(e, idx)}
                  placeholder={`Image ${idx + 1} Title`}
                  className="w-full font-black p-3 mb-4 border rounded-md text-black"
                />
              </div>
            ))}
            <button
              type="submit"
              className={`w-full p-3 rounded-md ${loading ? 'bg-gray-500' : 'bg-green-500'} text-white font-bold`}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add News"}
            </button>
          </form>

        )}

      </div>
    </div>
  );
};

export default Admin;
