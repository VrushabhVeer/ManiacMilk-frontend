import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAllProducts, deleteProduct } from "../utils/apis";
import ProductModal from "./ProductModal";
import Modal from "../components/common/Modal";


const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete confirmation modal state
  const [deleteProductId, setDeleteProductId] = useState(null); // Store product ID to delete

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null); // Clear form for a new product
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Prefill form with selected product data
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteProductId(id); // Set the product ID to delete
    setIsDeleteModalOpen(true); // Open the confirmation modal
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteProductId); // Delete the product
      toast.success("Product deleted successfully");
      fetchProducts(); // Refresh the product list
      setIsDeleteModalOpen(false); // Close the modal
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="product-listing">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Listing</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Product +
        </button>
      </div>

      {isModalOpen && (
        <ProductModal
          title={selectedProduct ? "Edit Product" : "Add Product"}
          onClose={() => setIsModalOpen(false)}
          onSave={fetchProducts}
          product={selectedProduct}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          title="Confirm Deletion"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Availability</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="h-24 w-[40%] object-cover m-auto rounded-sm"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{product.category}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {product.availability}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-2 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteConfirmation(product._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default ProductListing;
