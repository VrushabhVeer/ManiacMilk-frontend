import { useSelector } from "react-redux";
import Address from "../components/common/Address";

const Profile = () => {
  const { cart } = useSelector((state) => state.cart);

  // Calculate totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <div className="hero w-full pt-10 pb-10 md:pb-20">
      <div className="w-11/12 md:w-10/12 mx-auto mt-10 flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-5">Profile</h2>
          <div className="border p-5 rounded-md">
            <div className="mb-10">
              <p className="font-semibold">Vrushabh Veer</p>
              <p className="font-semibold mt-2">Email</p>
              <p className="text-gray-600">veervrushabh@gmail.com</p>
            </div>
            <Address />
          </div>
        </div>

        <div className="w-full">
          <p className="font-semibold mb-5">My Orders</p>
          <div className="border p-5 rounded-md">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-5 border-b border-gray-200 pb-4"
              >
                <div className="relative">
                  <img
                    src={item.frontImage}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border"
                  />

                  <span className="absolute top-[-8px] right-[-10px] bg-black text-white bg-opacity-50 pt-0.5 font-semibold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">₹ {item.price}</p>
                  <p className="text-gray-500">{item.size}</p>
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
