import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/connection";

const Admin = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // admin login 
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PSW) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };
  // Fetch products, orders, users, and image links
  useEffect(() => {
    if (showForm) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const productsCollection = collection(db, "products");
          const productSnapshot = await getDocs(productsCollection);
          const productList = productSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setProducts(productList);
        } catch (error) {
          console.error("Error fetching products:", error);
          alert("Failed to fetch products.");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [showForm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (showOrders) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const ordersCollection = collection(db, "orders");
          const orderSnapshot = await getDocs(ordersCollection);
          const orderList = orderSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setOrders(orderList);
        } catch (error) {
          console.error("Error fetching orders:", error);
          alert("Failed to fetch orders.");
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [showOrders]);

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

  const handleDelete = async (collectionName, itemId, stateSetter, stateArray) => {
    try {
      const docRef = doc(db, collectionName, itemId);
      await deleteDoc(docRef);
      stateSetter(stateArray.filter((item) => item.id !== itemId));
      alert(`${collectionName.slice(0, -1)} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting ${collectionName.slice(0, -1)}:`, error.message);
      alert(`Failed to delete ${collectionName.slice(0, -1)}.`);
    }
  };


  if (!isLoggedIn) {
    return (
      <div className="max-w-sm mx-auto p-4 font-sans">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-semibold mb-2">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Products" : "See Products"}
        </button>

        <button
          className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition"
          onClick={() => setShowOrders(!showOrders)}
        >
          {showOrders ? "Hide Orders" : "See Orders"}
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <form
          onSubmit={handleSubmitProduct}
          className=" bg-black border-2 shadow-md rounded-lg p-6 max-w-xl mx-auto mb-6"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Add Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border text-black border-gray-300 rounded-md mb-4 w-full"
          />
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border text-black border-gray-300 rounded-md mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 border text-black border-gray-300 rounded-md mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-3 border text-black border-gray-300 rounded-md mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500  px-6 py-2 rounded-md hover:bg-blue-600 transition w-full"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}

      {/* Products List */}
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
                  className="p-4 rounded-lg mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border-2"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-green-500 font-semibold mt-2">{product.price}</p>
                    <button
                      onClick={() =>
                        handleDelete("products", product.id, setProducts, products)
                      }
                      className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
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

      {showOrders && orders.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl text-center font-semibold mb-4">All Orders</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-black border-2 border-white p-4 rounded-lg w-full  sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="flex flex-col gap-1">
                  {/* User Information */}
                  <h3 className="font-bold text-lg text-center text-white">{order.userName}</h3>
                  <p className="text-white">Phone: {order.phone}</p>
                  <p className="text-white">Address: {order.address}</p>

                  {/* Iterate over the cart items (show all products) */}
                  {order.cart && order.cart.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold  text-blue-400">Products:</h4>

                      {/* Display all products in the cart */}
                      {order.cart.map((product, index) => (
                        <div key={index} className="text-white mt-2">
                          <p className="font-semibold">Product {index + 1}: {product.name}</p>
                          <p > Product Name : {product.name} </p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Size: {product.size}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Delete Button */}
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete("orders", order.id, setOrders, orders)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;