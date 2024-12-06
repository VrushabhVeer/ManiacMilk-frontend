import { useSelector } from "react-redux";

const CartItems = () => {
  const { cart } = useSelector((state) => state.cart);

  const subtotal = cart.reduce((total, item) => {
    return total + parseFloat((item.selectedSize?.price || 0) * item.quantity);
  }, 0);
  const shipping = cart.length > 0 ? 20 : 0;
  const total = subtotal + shipping;
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex items-center gap-5 border-b border-gray-200 pb-4"
        >
          <div className="relative">
            <img
              src={item.frontImage}
              alt={item.name}
              className="w-20 h-20 object-cover rounded border"
            />

            <span className="absolute top-[-8px] right-[-10px] bg-black text-white bg-opacity-50 pt-0.5 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {item.quantity}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="font-bold">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-600">
              Size: {item.selectedSize.size}
            </p>
            <p className="text-sm mt-1 text-gray-900 font-medium">
              ₹ {item.selectedSize.price}
            </p>
          </div>
        </div>
      ))}
      <div className="space-y-4 mt-4">
        <div className="flex justify-between">
          <p>
            Subtotal{" "}
            {cart.length > 1 && <span> • {totalItemsInCart} items</span>}
          </p>
          <p>₹ {subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>₹ {shipping}</p>
        </div>
        <div className="flex justify-between border-t pt-4">
          <div>
            <p className="font-semibold">Total</p>
            <p className="text-[13px] font-light text-gray-600">
              Including ₹0.00 in taxes
            </p>
          </div>

          <p className="font-semibold">
            <span className="text-[13px] font-light text-gray-600 font">
              INR
            </span>{" "}
            ₹ {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
