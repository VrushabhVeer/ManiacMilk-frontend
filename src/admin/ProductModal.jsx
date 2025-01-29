/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import closeImage from "../assets/icons/close.png";
import { createProduct, updateProduct } from "../utils/apis";
import toast, { Toaster } from "react-hot-toast";

const ProductModal = ({ title, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: "",
        frontImage: null,
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
            setFormData({
                name: product.name || "",
                frontImage: product.frontImage || null,
                category: product.category || "",
                availability: product.availability || "In Stock",
                unit: product.unit || "Kg",
                price: product.price || 0,
                description: product.description || "",
                sizes: product.sizes || [],
            });
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
            return Math.ceil(basePrice); // Ensure even the base price is rounded up
        }
    
        const sizeValue = parseInt(size.replace(/[^\d]/g, ""), 10); // Extract numerical value
        const calculatedPrice = (basePrice * sizeValue) / 1000; // Calculate price for smaller units
    
        return Math.ceil(calculatedPrice); // Round up the price to the nearest integer
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
        formDataToSend.append("frontImage", formData.frontImage);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("availability", formData.availability);
        formDataToSend.append("unit", formData.unit);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", Number(formData.price));
        formDataToSend.append("sizes", JSON.stringify(formData.sizes));

        try {
            if (product) {
                console.log("Updating product:", product._id);
                await updateProduct(product._id, formDataToSend);
                toast.success("Product updated successfully");
            } else {
                console.log("Creating new product:", formDataToSend);
                await createProduct(formDataToSend);
                toast.success("Product created successfully");
            }
            onClose(); // Close the modal
            onSave(); // Trigger parent refresh
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg w-11/12 max-w-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <img
                        className="w-5 cursor-pointer"
                        src={closeImage}
                        alt="close"
                        onClick={onClose}
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            Front Image
                        </label>
                        {formData.frontImage && (
                            <div className="mb-2">
                                {formData.frontImage instanceof File ? (
                                    // Preview the newly selected file
                                    <img
                                        src={URL.createObjectURL(formData.frontImage)}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    // Preview the existing image (URL from product data)
                                    <img
                                        src={formData.frontImage}
                                        alt="Existing Image"
                                        className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                                    />
                                )}
                            </div>
                        )}
                        <input
                            type="file"
                            name="frontImage"
                            accept="image/*"
                            onChange={(e) =>
                                setFormData({ ...formData, frontImage: e.target.files[0] })
                            }
                            className="custom-file-input"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1 text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-400 rounded-md text-sm outline-none"
                            required
                        />
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-sm mb-1 text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-400 rounded-md text-sm outline-none"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm mb-1 text-gray-700">
                                Availability
                            </label>
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-400 rounded-md text-sm outline-none"
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-sm mb-1 text-gray-700">Unit</label>
                            <select
                                name="unit"
                                value={formData.unit}
                                onChange={handleChange}
                                className="w-full border border-gray-400 rounded px-3 py-2 text-sm outline-none"
                            >
                                <option value="Kg">Kg</option>
                                <option value="Ltr">Ltr</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm mb-1 text-gray-700">
                                Price for 1 {formData.unit}
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-400 rounded-md text-sm outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            Choose Sizes
                        </label>

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
                        <label className="block text-sm mb-1 text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full h-28 p-2 border border-gray-400 rounded-md text-sm outline-none"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
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
