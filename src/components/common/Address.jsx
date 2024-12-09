import { useSelector } from "react-redux";
import editImage from "../../assets/icons/pen.png";

const Address = () => {
  const { address } = useSelector((state) => state.address);

  return (
    <div>
      <div className="flex items-center gap-40 mb-4 w-full">
        <h4 className="font-semibold text-lg">Address</h4>
        <img className="w-5 mt-2" src={editImage} alt="edit-image" loading="lazy" />
      </div>

      <p>{address.fullname || "N/A"}</p>
      <p className="text-gray-600">{address.email || "N/A"}</p>
      <p className="text-gray-600">
        {address.house}, {address.area}, {address.city}
      </p>
      <p className="text-gray-600">
        {address.state}, {address.pincode}
      </p>
      <p className="text-gray-600">+91 {address.mobile || "N/A"}</p>
    </div>
  );
};

export default Address;
