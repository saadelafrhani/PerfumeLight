import React, { useState, useRef, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Added `addDoc` here
import { db } from "../../firebase/connection";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("5ml");
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const scrollerRef = useRef(null);
    const [cart, setCart] = useState([]);
    const [cartModalOpen, setCartModalOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
                setFilteredProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = () => {
        const cartItem = {
            name: selectedProduct.name,
            size,
            quantity,
        };
        setCart([...cart, cartItem]);
        setSelectedProduct(null); // Close the product modal
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredData = products.filter((product) =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filteredData);
        } else {
            setFilteredProducts(products);
        }
    };

    const scrollLeft = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    const handleSendOrder = async (e) => {
        e.preventDefault();

        if (!userName || !phone || cart.length === 0) {
            alert("Please fill all fields and add items to your cart.");
            return;
        }

        const orderData = {
            userName,
            phone,
            cart,
            address,
            orderDate: new Date().toISOString(),
        };

        try {
            const ordersCollection = collection(db, "orders");
            await addDoc(ordersCollection, orderData); // Fixed the usage of `addDoc`

            alert("Order sent successfully!");
            setCart([]); // Clear cart
            setUserName("");
            setPhone("");
            setCartModalOpen(false); // Close the cart modal
        } catch (error) {
            console.error("Error sending order: ", error);
            alert("Failed to send order. Please try again later.");
        }
    };

    return (
        <div id="products" className="pt-5 px-4">
            <button
                onClick={() => setCartModalOpen(true)}
                className="fixed flex justify-center items-center pt-3 bottom-10 right-1/2 translate-x-1/2 bg-transparent text-white w-[60px] h-[60px] rounded-full shadow-lg border-2 border-dashed border-white hover:bg-gray-700 backdrop-blur-sm transition duration-300 z-50"
            >
                <img src="https://img.icons8.com/?size=100&id=KqV6G325egdQ&format=png&color=FA5252" alt="carticon" width="40px" height="40px" />
            </button>



            {/* Cart Modal */}
            {cartModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="bg-gray-900 text-white w-[90%] max-w-5xl p-6 rounded-lg shadow-lg flex flex-col sm:flex-row overflow-y-auto max-h-[90vh]">
                        {/* Left: Cart Items */}
                        <div className="w-full sm:w-1/2 sm:pr-4 border-b sm:border-b-0 sm:border-r border-gray-700 sm:mb-0 mb-6">
                            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                            {cart.length > 0 ? (
                                <ul className="space-y-4">
                                    {cart.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center border-b border-gray-700 pb-2"
                                        >
                                            <div>
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <p className="text-sm">Size: {item.size}</p>
                                                <p className="text-sm">Quantity: {item.quantity}</p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setCart(cart.filter((_, i) => i !== index))
                                                }
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <img
                                                    src="https://img.icons8.com/?size=100&id=7837&format=png&color=FA5252"
                                                    alt="delete icon"
                                                    height="30px"
                                                    width="30px"
                                                />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                        </div>

                        {/* Right: Order Form */}
                        <div className="w-full sm:w-1/2 sm:pl-4">
                            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                            <form onSubmit={handleSendOrder} className="space-y-4">
                                <div>
                                    <label className="block text-white mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full text-black border-gray-300 rounded p-2"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Phone</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full text-black border-gray-300 rounded p-2"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-1">Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full text-black border-gray-300 rounded p-2"
                                        placeholder="Enter your address"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    onClick={handleSendOrder}
                                    className="w-full border-2  hover:bg-blue-950 text-white py-2 rounded"
                                >
                                    Send Order
                                </button>

                                <button
                                    onClick={() => setCartModalOpen(false)}
                                    className="w-full border-2 hover:bg-red-600 text-white py-2 rounded mt-2"
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}


            {/* Search Bar */}
            <div className="flex w-[80%] mx-auto pt-5">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-grow border-2 border-gray-300 rounded-l-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Search for a product..."
                />
                <button
                    type="submit"
                    className="bg-gray-300 px-4 py-2 rounded-r-md border-l-2 border-gray-400 hover:scale-110 transform transition-transform duration-200 ease-in-out focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/775/775307.png"
                        alt="Search Icon"
                        className="h-6 w-6"
                    />
                </button>
            </div>

            {/* Products Section */}
            <div className="mt-10 relative">
                <div
                    ref={scrollerRef}
                    className="flex overflow-x-auto gap-6 scrollbar-hide py-4"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0 flex justify-center items-center flex-col shadow-lg rounded-lg p-6 border-4 border-white"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg object-cover mb-6"
                            />
                            <h1 className="text-xl font-bold font-charm mb-4">{product.name}</h1>
                            <p className="text-base text-gray-500 mb-6">{product.description}</p>
                            <h1 className="text-lg font-semibold mb-6">{product.price}</h1>
                            <button
                                onClick={() => setSelectedProduct(product)}
                                className="text-white px-6 py-3 border-white border-2 rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                VIEW PRODUCT
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-black p-6 rounded-lg shadow-lg w-[90%] max-w-4xl flex flex-col sm:flex-row max-h-[80vh] overflow-y-auto">
                        {/* Product Image */}
                        <div className="w-full sm:w-[30%] flex justify-center items-center mb-6 sm:mb-0">
                            <img
                                src={selectedProduct.imageUrl}
                                alt={selectedProduct.name}
                                className="w-full h-[250px] object-cover rounded-lg"
                            />
                        </div>
                        {/* Product Details */}
                        <div className="w-full sm:w-[70%] px-6 text-white">
                            <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
                            <p className="text-lg text-gray-400 mb-4">{selectedProduct.description}</p>
                            <h2 className="text-2xl font-semibold mb-6">{selectedProduct.price}</h2>

                            {/* Quantity */}
                            <div className="mb-6">
                                <label className="block text-white mb-2">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    className="w-full text-black border-gray-300 rounded p-2"
                                />
                            </div>

                            {/* Size Selection */}
                            <div className="mb-6">
                                <label className="block text-white mb-2">Size</label>
                                <select
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full text-black border-gray-300 rounded p-2"
                                >
                                    <option value="5ml">5ml</option>
                                    <option value="10ml">10ml</option>
                                    <option value="15ml">15ml</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full border-2 text-white py-3 rounded-lg mt-4 hover:bg-gray-500 transition duration-300"
                            >
                                ADD TO CART
                            </button>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="w-full border-2 text-white py-3 rounded-lg mt-4 hover:bg-red-600 transition duration-300"
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Products;


