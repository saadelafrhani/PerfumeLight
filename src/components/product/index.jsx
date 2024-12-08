import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/connection';

const Products = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from Firestore on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const productSnapshot = await getDocs(productsCollection);
                const productList = productSnapshot.docs.map(doc => doc.data());
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="pt-5 px-4">
            {/* Heading */}
            <div className="flex justify-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-charm text-center">
                    Plupare Products
                </h1>
            </div>

            {/* Product Cards */}
            <div className="mt-10 flex overflow-x-auto space-x-4">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="min-w-[250px] max-w-[300px] flex-shrink-0 border-white border-2 shadow-lg rounded-lg p-4"
                    >
                        <img
                            src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                            alt={`Product ${index + 1}`}
                            className="w-full h-[200px] rounded-lg object-cover mb-4"
                        />
                        <h1 className="text-lg font-bold mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                        <h1 className="text-base text-center font-semibold mb-4">${product.price}</h1>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            VIEW PRODUCT
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
