import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, fetchLoggedInCart, deleteProduct } from "../../redux/cartSlice";
import { clearCartAPI } from "../../utils/apis";
import emptyImage from "../../assets/images/empty.png";
import rightArrow from "../../assets/icons/rightArrow.png";
import Modal from "../common/Modal";

const AuthCart = () => {
    const { isAuthenticated, userId } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping] = useState(0);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        if (isAuthenticated && userId) {
            dispatch(fetchLoggedInCart(userId));
        }
    }, [isAuthenticated, userId, dispatch]);

    // Calculate totals
    useEffect(() => {
        const newSubtotal = cart.reduce(
            (acc, item) => acc + item.selectedSize.price * item.quantity,
            0
        );
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + shipping);
    }, [cart, shipping]);

    const handleClearCart = () => {
        setModalAction("clear");
        setIsModalOpen(true);
    };

    const handleRemove = (productId, size) => {
        setSelectedProductId({ productId, size });
        setModalAction("remove");
        setIsModalOpen(true);
    };

    // const handleIncrement = (productId, size) => {
    //     setCart((prevCart) =>
    //         prevCart.map((item) =>
    //             item._id === productId && item.selectedSize.size === size.size
    //                 ? { ...item, quantity: item.quantity + 1 }
    //                 : item
    //         )
    //     );
    // };

    // const handleDecrement = (productId, size) => {
    //     setCart((prevCart) =>
    //         prevCart.map((item) =>
    //             item._id === productId && item.selectedSize.size === size.size
    //                 ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
    //                 : item
    //         )
    //     );
    // };

    const handleConfirm = async () => {
        if (modalAction === "clear") {
            await clearCartAPI(userId);
            dispatch(clearCart());
        } else if (modalAction === "remove" && selectedProductId) {
            dispatch(deleteProduct(selectedProductId));
        
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="hero">
            <Modal
                isOpen={isModalOpen}
                title={modalAction === "clear" ? "Clear Cart" : "Remove Item"}
                message={
                    modalAction === "clear"
                        ? "Are you sure you want to clear the cart?"
                        : "Are you sure you want to remove this item from the cart?"
                }
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            <div className="w-11/12 md:w-10/12 mx-auto pt-10 pb-10 md:pb-20">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center mt-12">
                        <img
                            src={emptyImage}
                            alt="Empty Cart"
                            className="w-10/12 mx-auto md:w-3/12"
                        />
                        <p className="text-center mt-5 text-[#1a1d20] text-2xl font-bold">
                            Your cart is empty
                        </p>
                        <p className="mt-2 text-gray-600">
                            Looks like you have not added anything to your cart
                        </p>

                        <Link to="/products">
                            <button className="bg-green-900 text-white px-6 py-3 rounded-full tracking-wide font-medium mt-8 text-sm flex items-center gap-2">
                                Continue Shopping{" "}
                                <img
                                    className="w-4"
                                    src={rightArrow}
                                    alt="right-arrow"
                                    loading="lazy"
                                />
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 mt-12">
                        <div className="w-full md:w-2/3">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Cart Items [{cart.length}]
                                </h2>
                                <button
                                    onClick={handleClearCart}
                                    className="text-red-500 underline hover:text-red-700"
                                >
                                    Clear Cart
                                </button>
                            </div>

                            <div className="space-y-6 mt-8">
                                {cart.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-5 border-b border-gray-200 pb-4"
                                    >
                                        <img
                                            src={item.frontImage}
                                            alt={item.name}
                                            className="w-32 h-32 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold">{item.name}</h3>
                                            <p className="text-gray-500">
                                                Size: {item.selectedSize.size}
                                            </p>
                                            <p className="text-gray-500">
                                                Price: ₹ {item.selectedSize.price}/
                                                <span className="text-[12px]">per unit</span>
                                            </p>
                                            <p className="text-gray-800 font-semibold mt-1">
                                                Total: ₹ {item.selectedSize.price * item.quantity}
                                            </p>

                                            <div className="flex items-center mt-2">
                                                <button
                                                    aria-label="Decrement quantity"
                                                    disabled={item.quantity <= 1}
                                                    // onClick={() =>
                                                    //     handleDecrement(item._id, item.selectedSize)
                                                    // }
                                                    className="px-3 py-1.5 text-sm font-semibold border border-gray-300 hover:bg-gray-100"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1.5 text-sm font-semibold border-t border-b border-gray-300">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    aria-label="Increase quantity"
                                                    disabled={item.quantity >= 4}
                                                    // onClick={() =>
                                                    //     handleIncrement(item._id, item.selectedSize)
                                                    // }
                                                    className="px-3 py-1.5 text-sm font-semibold border border-gray-300 hover:bg-gray-100"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            {item.quantity >= 4 && (
                                                <p className="text-red-600 text-sm mt-2">
                                                    Maximum limit of 4 items reached.
                                                </p>
                                            )}

                                            <button
                                                onClick={() =>
                                                    handleRemove(item._id, item.selectedSize)
                                                }
                                                className="mt-2 text-red-500 text-sm hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full md:w-1/3">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>₹ {subtotal}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p>{shipping === 0 ? "Free" : `₹ ${shipping}`}</p>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <p className="font-medium">Total</p>
                                    <p className="font-medium">₹ {total}</p>
                                </div>
                            </div>
                            <Link to="/checkout">
                                <button className="w-full bg-green-900 text-white py-3 rounded-full font-medium tracking-wide mt-8 flex items-center justify-center gap-2 hover:bg-green-800">
                                    Proceed to Checkout
                                    <img
                                        src={rightArrow}
                                        alt="Proceed"
                                        className="w-4"
                                        loading="lazy"
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthCart;
