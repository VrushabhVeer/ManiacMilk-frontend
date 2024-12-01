import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { singleProduct } from "../utils/apis";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await singleProduct(params.productId);
        setProduct(response.data);

        if (response.data.sizes?.length) {
          setSelectedSize(response.data.sizes[0]); // Default to the first size
          calculatePrice(response.data.price, response.data.sizes[0]); // Calculate initial price
          setIsSizeSelected(true); // Enable Add to Cart button
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product details");
      }
    };
    getProduct();
  }, [params]);

  const calculatePrice = (basePrice, size) => {
    let sizeInUnits;

    // Calculate price for sizes (in grams, kg, liters)
    if (size.includes("ml")) {
      sizeInUnits = parseInt(size.replace("ml", ""), 10); // Convert ml to base units (1ml = 1g)
    } else if (size.includes("Ltr")) {
      sizeInUnits = parseInt(size.replace("Ltr", ""), 10) * 1000; // Convert liters to grams (1L = 1000g)
    } else if (size.includes("g")) {
      sizeInUnits = parseInt(size.replace("g", ""), 10); // Grams as base unit
    } else if (size.includes("Kg")) {
      sizeInUnits = parseInt(size.replace("Kg", ""), 10) * 1000; // Convert kg to grams
    }

    // Price calculation based on size
    const pricePerUnit = basePrice / 1000; // Assuming price is provided for 1kg or 1L
    const price = Math.round(pricePerUnit * sizeInUnits); // Adjust price based on size in grams
    setCalculatedPrice(price);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    calculatePrice(product.price, size);
    setIsSizeSelected(true); // Enable Add to Cart button
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity is at least 1
  };

  const handleCart = () => {
    if (!selectedSize || quantity < 1) {
      toast.error("Please select a valid size and quantity");
      return;
    }
    const cartProduct = {
      ...product,
      selectedSize,
      price: calculatedPrice,
      quantity,
    };
    dispatch(setCart(cartProduct));
    toast.success("Added to Cart");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const cartProduct = {
      ...product,
      selectedSize,
      price: calculatedPrice,
      quantity,
    };
    dispatch(setCart(cartProduct));
    navigate("/checkout");
  };

  console.log("first", product)

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
            <p className="text-green-700 text-sm">
              {product.tags?.length ? product.tags.join(" ") : ""}
            </p>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            <p className="mt-1">
              Rs. {calculatedPrice}
              <span className="text-sm text-gray-600"> /{selectedSize}</span>
            </p>

            <p className="mt-5 font-medium">Select Size</p>
            <div className="flex items-center mt-2 gap-2">
              {product.sizes?.map((size, index) => (
                <div
                  key={index}
                  onClick={() => handleSizeClick(size)}
                  className={`cursor-pointer py-2 px-4 border text-sm ${selectedSize === size
                    ? "bg-green-100 border-2 border-green-400"
                    : "bg-green-50 hover:bg-green-100 border-gray-300"
                    }`}
                >
                  {size}
                </div>
              ))}
            </div>

            <p className="mt-5 font-medium">Select Quantity</p>
            <div className="flex items-center mt-2">
              <button
                aria-label="Decrement quantity"
                onClick={() => handleQuantityChange(-1)}
                className="py-2 px-4 text-sm font-semibold border border-gray-300"
              >
                -
              </button>
              <div className="py-2 px-4 text-sm font-semibold border-t border-b border-gray-300">
                {quantity}
              </div>
              <button
                aria-label="Increase quantity"
                onClick={() => handleQuantityChange(1)}
                className="py-2 px-4 text-sm font-semibold border border-gray-300"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleCart}
                disabled={!isSizeSelected}
                className={`px-8 py-3 uppercase rounded-full tracking-wide font-medium text-sm ${isSizeSelected
                  ? "bg-green-900 text-white"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-900 text-white px-8 py-3 uppercase rounded-full tracking-wide font-medium text-sm"
              >
                Buy Now
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-600">{product.description}</p>
          </div>
        </div>

        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export default ProductDetails;