import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/connection';

const AdminInputs = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !description || !price || !imageUrl) {
            alert("Please fill in all fields.");
            return;
        }

        setLoading(true);

        try {
            // Add product data to Firestore
            const productsCollection = collection(db, "products");
            await addDoc(productsCollection, {
                name,
                description,
                price,
                imageUrl,
            });

            // Reset form
            setName('');
            setDescription('');
            setPrice('');
            setImageUrl('');

            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product: ", error);
            alert("Failed to add product.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-lg">Product Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-lg">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-lg">Price</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                />
            </div>
            <div>
                <label htmlFor="imageUrl" className="block text-lg">Image URL</label>
                <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};

export default AdminInputs;
