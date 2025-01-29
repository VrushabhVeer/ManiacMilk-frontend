import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCartAPI, singleProduct } from "../utils/apis";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated, userId } = useSelector((state) => state.auth);
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

  const handleCart = async () => {
    if (!selectedSize || quantity < 1) {
      toast.error("Please select a valid size and quantity");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      frontImage: product.frontImage,
      selectedSize,
      quantity,
    };

    const payload = {
      userId,
      items: [cartItem],
    };

    if (isAuthenticated) {
      try {
        await addToCartAPI(payload);
        dispatch(setCart(cartItem));
        toast.success("Added to Cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart");
      }
    } else {
      dispatch(setCart(cartItem));
      toast.success("Added to Cart");
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize || quantity < 1) {
      toast.error("Please select a valid size and quantity");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      frontImage: product.frontImage,
      selectedSize,
      quantity,
    };

    if (isAuthenticated) {
      try {
        await addToCartAPI({ userId, items: [cartItem] });
        dispatch(setCart(cartItem));
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart");
        return;
      }
    } else {
      dispatch(setCart(cartItem));
    }

    navigate("/checkout");
  };

  return (
    <div className="hero">
      <div className="w-11/12 md:w-8/12 mx-auto pt-10 pb-10 md:pb-20">
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
                  className={`cursor-pointer py-2 px-4 border text-sm ${
                    size.size === selectedSize?.size
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
              {quantity >= 4 && (
                <p className="text-red-600 text-sm mt-2">
                  Maximum limit of 4 items reached.
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                className={`px-8 py-3 uppercase rounded-full tracking-wide font-medium text-sm ${
                  product.availability === "Out of Stock"
                    ? "bg-green-900 cursor-not-allowed text-white"
                    : "bg-green-900 text-white"
                }`}
                onClick={handleCart}
                disabled={product.availability === "Out of Stock"}
              >
                Add to Cart
              </button>
              <button
                className={`px-8 py-3 uppercase rounded-full tracking-wide font-medium text-sm ${
                  product.availability === "Out of Stock"
                    ? "bg-green-900 cursor-not-allowed text-white"
                    : "bg-green-900 text-white"
                }`}
                onClick={handleBuyNow}
                disabled={product.availability === "Out of Stock"}
              >
                Buy Now
              </button>
            </div>
            {product.availability === "Out of Stock" && (
              <p className="text-red-500 mt-3 font-semibold">Out of Stock</p>
            )}

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
