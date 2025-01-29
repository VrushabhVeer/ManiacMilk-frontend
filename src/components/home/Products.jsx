import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCartAPI, getAllProducts } from "../../utils/apis";
import { setCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { isAuthenticated, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCart = async (product) => {
    const defaultSize = product.sizes[product.sizes.length - 1];
    const cartItem = {
      productId: product._id,
      name: product.name,
      frontImage: product.frontImage,
      selectedSize: defaultSize,
      quantity: 1,
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
      } catch {
        toast.error("Failed to add to cart");
      }
    } else {
      dispatch(setCart(cartItem));
      toast.success("Added to Cart");
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-20 md:mt-24 lg:mt-40 mb-10 md:mb-20">
      <h1 className="text-center text-xl md:text-3xl font-bold text-[#1a1d20]">
        Our Products
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-10 mt-10">
        {products.slice(0, 4).map((product) => (
          <div key={product._id}>
            <div className="relative">
              <Link to={`/products/${product._id}`}>
                <img
                  className="w-full h-[46vh] md:h-[46vh] object-cover"
                  src={product.frontImage}
                  alt={product.name}
                  loading="lazy"
                />
              </Link>
              <div
                className={`text-white font-semibold text-[12px] absolute top-0 left p-1.5 ${
                  product.availability === "Out of Stock"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {product.availability}
              </div>
            </div>
            <div className="p-3">
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="mt-1">
                Rs. {product.sizes[product.sizes.length - 1].price}
                <span className="text-sm text-gray-500">
                  /per {product.unit}
                </span>
              </p>
            </div>

            <button
              onClick={() => handleCart(product)}
              disabled={product.availability === "Out of Stock"}
              className={`bg-green-900 text-white w-full py-3 tracking-wide font-medium rounded-md text-sm ${
                product.availability === "Out of Stock"
                  ? "bg-green-900 cursor-not-allowed text-white"
                  : ""
              }`}
            >
              Add to Cart
            </button>

            {product.availability === "Out of Stock" && (
              <p className="text-red-500 text-center mt-2 text-sm">
                Out of Stock
              </p>
            )}
          </div>
        ))}
      </div>

      <Link to="/products">
        <h2 className="text-center font-semibold underline mt-10">
          Explore More
        </h2>
      </Link>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Products;
