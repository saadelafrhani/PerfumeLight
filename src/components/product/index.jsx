import { useState } from "react";

const Products = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("Selected:", event.target.value);
    };

    return (
        <div className="pt-5 px-4">
            {/* Heading */}
            <div className="flex justify-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-charm text-center">
                    Plupare Products
                </h1>
            </div>

            {/* Select, Input, and Search */}
            <div className="flex flex-col sm:flex-row justify-around items-center pt-8 gap-6 sm:gap-4">
                {/* Select Dropdown */}
                <div className="w-full sm:w-auto hidden sm:block">
                    <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        className="w-full sm:w-auto bg-black text-white font-semibold cursor-pointer p-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-custom-pink"
                    >
                        <option value="" disabled>
                            Select Gender
                        </option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                    </select>
                </div>

                {/* Display Selected Option */}
                <div className="text-center sm:mt-0">
                    {selectedOption && (
                        <p className="text-lg font-medium">
                            You selected: <span className="font-bold">{selectedOption}</span>
                        </p>
                    )}
                </div>

                {/* Search Input */}
                <div className="flex w-full sm:w-1/3">
                    <input
                        type="text"
                        className="flex-grow border-2 border-gray-300 border-r-0 rounded-l-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                        placeholder="What are you looking for?"
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
            </div>

            {/* Products Section */}
            <div className="mt-10">
                {/* Add product-related content here */}
            </div>
        </div>
    );
};

export default Products;
