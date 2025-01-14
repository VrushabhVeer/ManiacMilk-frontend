/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import closeImage from "../assets/icons/close.png";
import { createProduct, updateProduct } from "../utils/apis";
import toast, { Toaster } from "react-hot-toast";

const ProductModal = ({ title, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: "",
        frontImage: null,
        backImage: null,
        category: "",
        availability: "In Stock",
        unit: "Kg",
        price: 0,
        description: "",
        sizes: [],
    });

    const sizeOptions = {
        Kg: ["250gm", "500gm", "1kg"],
        Ltr: ["250ml", "500ml", "1ltr"],
    };

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Reset sizes if the unit changes
        if (name === "unit") {
            setFormData({ ...formData, unit: value, sizes: [] });
        }
    };

    const calculatePrice = (size) => {
        const basePrice = parseFloat(formData.price);
        if (size === "1kg" || size === "1ltr") {
            // Directly use the base price for 1kg or 1ltr
            return basePrice;
        }

        const sizeValue = parseInt(size.replace(/[^\d]/g, ""), 10); // Extract numerical value
        const isKg = formData.unit === "Kg";

        if (isKg) {
            return (basePrice * sizeValue) / 1000; // Convert gm to price
        } else {
            return (basePrice * sizeValue) / 1000; // Convert ml to price
        }
    };

    const handleSizeToggle = (size) => {
        const currentSizes = formData.sizes;
        const existingSize = currentSizes.find((s) => s.size === size);

        if (existingSize) {
            // Remove size if already selected
            setFormData({
                ...formData,
                sizes: currentSizes.filter((s) => s.size !== size),
            });
        } else {
            // Add size with calculated price if not selected
            setFormData({
                ...formData,
                sizes: [...currentSizes, { size, price: calculatePrice(size) }],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        console.log("Front Image:", formData.frontImage);
        console.log("Back Image:", formData.backImage);
        formDataToSend.append("frontImage", formData.frontImage);
        formDataToSend.append("backImage", formData.backImage);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("availability", formData.availability);
        formDataToSend.append("unit", formData.unit);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", Number(formData.price));
        formDataToSend.append("sizes", JSON.stringify(formData.sizes));

        console.log("FormData to send:", Object.fromEntries(formDataToSend));
        onSave(formDataToSend);

        let payload = Object.fromEntries(formDataToSend)

        try {
            if (product) {
                console.log("Updating product:", product._id);
                await updateProduct(product._id, formDataToSend);
                toast.success("Product updated successfully");
            } else if(formDataToSend) {
                console.log("Creating new product:", payload);
                await createProduct(payload);
                toast.success("Product created successfully");
            }

            onClose(); // Close modal

            if (!formData.name || !formData.frontImage || !formData.category || !formData.unit || !formData.description || !formData.price) {
                console.error("Missing required fields:", formData);
                toast.error("Please fill in all required fields");
                return;
            }
            
            onSave(); // Trigger parent refresh
        } catch {
            toast.error("Failed to save product");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-11/12 max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <img
                        className="w-5 cursor-pointer"
                        src={closeImage}
                        alt="close"
                        onClick={onClose}
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-full">
                            <label className="block text-gray-700">Front Image</label>
                            <input
                                type="file"
                                name="frontImage"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, frontImage: e.target.files[0] })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-gray-700">Back Image</label>
                            <input
                                type="file"
                                name="backImage"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, backImage: e.target.files[0] })}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Availability</label>
                        <select
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-gray-700">Unit</label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="Kg">Kg</option>
                                <option value="Ltr">Ltr</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700">
                                Price for 1 {formData.unit}
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Choose Sizes</label>

                        <div className="flex items-center gap-3 flex-wrap">
                            {sizeOptions[formData.unit].map((size) => (
                                <div
                                    key={size}
                                    onClick={() => handleSizeToggle(size)}
                                    className={`px-4 py-2 rounded-md border text-sm ${formData.sizes.find((s) => s.size === size)
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "border-gray-400 text-gray-700 hover:bg-gray-100"
                                        } cursor-pointer`}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <Toaster position="bottom-center" />
        </div>
    );
};

export default ProductModal;
