import { useEffect, useState } from "react";
import { addToCartAPI, getAllProducts } from "../utils/apis";
import { Link } from "react-router-dom";
import { setCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/common/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const categories = [
    "All",
    "Milk",
    "Paneer",
    "Curd",
    "Ghee",
    "Lassi",
    "Buttermilk",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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
    <div className="w-full hero pt-10 pb-20">
      <div className="w-11/12 md:w-10/12 mx-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold">Our Products</h1>

        <div className="flex flex-wrap gap-4 mt-5">
          {categories.map((category) => (
            <div
              key={category}
              className={`cursor-pointer px-5 py-2 border text-sm border-gray-300 rounded-full ${selectedCategory === category
                ? "bg-green-200"
                : "bg-green-50 hover:bg-green-100"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-20 mt-20">
            {filteredProducts.map((product) => (
              <div key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <div className="relative">
                    <img
                      className="w-full h-[46vh] md:h-[46vh] object-cover"
                      src={product.frontImage}
                      alt={product.name}
                      loading="lazy"
                    />
                    <div
                      className={`text-white font-semibold text-[11px] absolute top-0 left py-1.5 px-2 ${product.availability === "Out of Stock"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                        }`}
                    >
                      {product.availability}
                    </div>
                  </div>
                </Link>
                <div className="p-3">
                  <h2 className="text-lg font-bold">{product.name}</h2>
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
                  className={`w-full py-3 tracking-wide font-medium rounded-sm text-sm ${product.availability === "Out of Stock"
                    ? "bg-green-900 cursor-not-allowed text-white"
                    : "bg-green-900 text-white"
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
        )}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Products;
