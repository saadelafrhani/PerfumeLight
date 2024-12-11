import React, { useState, useRef, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/connection";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const scrollerRef = useRef(null);

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

    const handleSearchChange = async (e) => {
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
        scrollerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div id="products" className="pt-5 px-4">
            {/* Heading */}
            <div className="flex justify-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-charm text-center">
                    Plupare Products
                </h1>
            </div>

            {/* Search Input */}
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
                {/* Scroller */}
                <div
                    ref={scrollerRef}
                    className="flex overflow-x-auto gap-6 scrollbar-hide py-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
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
                            <button className="text-white px-6 py-3 border-white border-2 rounded-lg hover:bg-gray-600 transition duration-300">
                                VIEW PRODUCT
                            </button>
                        </div>
                    ))}
                </div>

                {/* Scroll Buttons */}
                <div className="flex justify-center md:justify-end gap-2 mt-3 md:pr-20">
                    <button
                        onClick={scrollLeft}
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-110 transition-all duration-200 shadow-sm"
                    >
                        <img
                            src="https://img.icons8.com/?size=24&id=26146&format=png"
                            alt="Scroll Left"
                            className="w-10 h-10"
                        />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-110 transition-all duration-200 shadow-sm"
                    >
                        <img
                            src="https://img.icons8.com/?size=24&id=26147&format=png"
                            alt="Scroll Right"
                            className="w-10 h-10"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
