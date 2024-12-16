import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../redux/profileSlice";
import toast from "react-hot-toast";
import editImage from "../../assets/icons/pen.png";
import closeImage from "../../assets/icons/close.png";
import { updateProfile } from "../../redux/profileSlice";

const ProfileInfo = () => {
  const { profile } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: profile?.firstname || "",
    lastname: profile?.lastname || "",
    mobile: profile?.mobile || "",
  });
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setFormData({
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
      mobile: profile?.mobile || "",
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="border p-5 rounded-md">
      {!isEditing ? (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-20 md:gap-40">
                <p className="font-semibold">
                  {profile?.firstname} {profile?.lastname}
                </p>
                <img
                  className="w-4 cursor-pointer"
                  src={editImage}
                  alt="edit"
                  onClick={handleEditClick}
                />
              </div>
            </div>
            <p className="font-semibold mt-2">Email</p>
            <p className="text-gray-600">{profile?.email}</p>
            <p className="font-semibold mt-2">Mobile</p>
            <p className="text-gray-600">{profile?.mobile}</p>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
            <div className="w-full">
              <input
                placeholder="Firstname"
                className="w-full bg-inherit rounded-md border outline-none px-5 py-3 border-gray-400"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Lastname"
                className="w-full bg-inherit rounded-md border outline-none px-5 py-3 border-gray-400"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <input
              placeholder="Mobile No"
              className="w-full bg-inherit rounded-md border outline-none px-5 py-3 border-gray-400"
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileInfo;
