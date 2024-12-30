/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Address from "../../components/common/Address";
import editImage from "../../assets/icons/pen.png";
import closeImage from "../../assets/icons/close.png";
import settingsIcon from "../../assets/icons/setting.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";

const ProfileInfo = ({ onEdit, onDelete, userId }) => {
  const profile = useSelector((state) => state.profile.data);
  const [formData, setFormData] = useState({
    firstname: profile?.firstname || "",
    lastname: profile?.lastname || "",
    mobile: profile?.mobile || "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setFormData({
        firstname: profile.firstname || "",
        lastname: profile.lastname || "",
        mobile: profile.mobile || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      dispatch(clearCart());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch {
      toast.error("Failed to log out.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEdit(formData); // Update via Redux
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Edit Profile</h3>
            <img
              className="w-5 cursor-pointer"
              src={closeImage}
              alt="close-image"
              loading="lazy"
              onClick={() => setIsEditing(false)}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-4 flex flex-col md:flex-row items-center gap-4">
              <div className="w-full">
                <input
                  placeholder="Firstname"
                  className="w-full bg-inherit rounded-md border outline-none px-5 py-3 border-gray-400"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                />
              </div>

              <div className="w-full">
                <input
                  placeholder="Lastname"
                  className="w-full bg-inherit rounded-md border outline-none px-5 py-3 border-gray-400"
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
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
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
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
        </div>
      </div>
    );
  }

  return (
    <div className="border p-5 rounded-md">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-20 md:gap-40">
            <p className="font-semibold">
              {profile?.firstname && profile?.lastname
                ? `${profile.firstname} ${profile.lastname}`
                : profile?.firstname ||
                  profile?.lastname || (
                    <span className="text-sm text-gray-600 font-light">
                      Your Name
                    </span>
                  )}
            </p>

            <img
              className="w-4 cursor-pointer"
              src={editImage}
              alt="edit-image"
              loading="lazy"
              onClick={handleEdit}
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <img
              className="w-4 cursor-pointer"
              src={settingsIcon}
              alt="settings"
              loading="lazy"
              onClick={handleDropdownToggle}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={onDelete}
                >
                  Delete Account
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="font-semibold mt-2">Email</p>
        <p className="text-gray-600">{profile?.email}</p>
        <p className="font-semibold mt-2">Mobile</p>
        <p className="text-gray-600">
          +91{" "}
          {profile?.mobile || (
            <span className="text-sm text-gray-600 font-light">Mobile No</span>
          )}
        </p>
      </div>

      <Address userId={userId} />
    </div>
  );
};

export default ProfileInfo;
