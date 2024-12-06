import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { singleProduct } from "../utils/apis"; // Replace with actual API call
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await singleProduct(params.productId);
        setProduct(response.data);

        if (response.data.sizes?.length) {
          setSelectedSize(response.data.sizes[0]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product details");
      }
    };
    getProduct();
  }, [params]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleCart = () => {
    if (!selectedSize || quantity < 1) {
      toast.error("Please select a valid size and quantity");
      return;
    }
    const cartProduct = {
      ...product,
      selectedSize,
      quantity,
    };
    dispatch(setCart(cartProduct));
    toast.success("Added to Cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize || quantity < 1) {
      toast.error("Please select a valid size and quantity");
      return;
    }
    const cartProduct = {
      ...product,
      selectedSize,
      quantity,
    };
    dispatch(setCart(cartProduct));
    navigate("/checkout");
  };

  return (
    <div className="hero">
      <div className="w-11/12 md:w-10/12 mx-auto pt-10 pb-10 md:pb-20">
        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row items-center gap-10 md:gap-20">
          <div className="w-full">
            <img
              className="w-full"
              src={product.frontImage}
              alt={product.category}
              loading="lazy"
            />
          </div>
          <div className="w-full">
            <p className="text-green-700 text-sm">{product.tags?.join(" ")}</p>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            <p className="mt-1">
              Rs. {selectedSize?.price}
              <span className="text-sm text-gray-600">
                {" "}
                / {selectedSize?.size}
              </span>
            </p>

            <p className="mt-5 font-medium">Select Size</p>
            <div className="flex items-center mt-2 gap-2">
              {product.sizes?.map((size, index) => (
                <div
                  key={index}
                  onClick={() => handleSizeClick(size)}
                  className={`cursor-pointer py-2 px-4 border text-sm ${size.size === selectedSize?.size
                      ? "bg-green-100 border-2 border-green-400"
                      : "bg-green-50 hover:bg-green-100 border-gray-300"
                    }`}
                >
                  {size.size}
                </div>
              ))}
            </div>

            <p className="mt-5 font-medium">Quantity</p>
            <div className="flex flex-col items-start mt-2">
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="py-2 px-4 text-sm font-semibold border border-gray-300"
                >
                  -
                </button>
                <div className="py-2 px-4 text-sm font-semibold border-t border-b border-gray-300">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 4}
                  className="py-2 px-4 text-sm font-semibold border border-gray-300"
                >
                  +
                </button>
              </div>
              {quantity > 4 && (
                <p className="text-red-600 text-sm mt-2">
                  Maximum limit of 4 items reached.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                className="bg-green-900 text-white px-8 py-3 uppercase rounded-full tracking-wide font-medium text-sm"
                onClick={handleCart}
              >
                Add to Cart
              </button>
              <button
                className="bg-green-900 text-white px-8 py-3 uppercase rounded-full tracking-wide font-medium text-sm"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            <p className="mt-6 font-medium">Description</p>
            <p className="mt-1 text-sm">{product.description}</p>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ProductDetails;
