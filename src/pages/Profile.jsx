import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount, editProfile, getProfile } from "../utils/apis";
import Orders from "../components/profile/Orders";
import CompletedOrders from "../components/profile/CompletedOrders";
import editImage from "../assets/icons/pen.png";
import closeImage from "../assets/icons/close.png";
import settingsIcon from "../assets/icons/setting.png";
import toast from "react-hot-toast";
import Address from "../components/common/Address";
import Modal from "../components/common/Modal";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal
  const dropdownRef = useRef(null); // Create a reference for the dropdown
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    getProfileData();
  }, [navigate]);

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

  const confirmDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success("Account deleted successfully!");
      localStorage.clear();
      navigate("/"); // Redirect to homepage or login
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteAccountClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      // await logout();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  };

  const onEdit = () => {
    setFormData({
      firstname: profile?.firstname || "",
      lastname: profile?.lastname || "",
      mobile: profile?.mobile || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editProfile(formData);
      const updatedProfile = await getProfile();
      setProfile(updatedProfile.data);
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("user", profile);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="border p-5 rounded-md">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-20 md:gap-40">
                  <p className="font-semibold">
                    {profile?.firstname} {profile?.lastname}
                  </p>

                  <img
                    className="w-4 cursor-pointer"
                    src={editImage}
                    alt="edit-image"
                    loading="lazy"
                    onClick={onEdit}
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
                        onClick={handleDeleteAccountClick}
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
              <p className="text-gray-600">{profile?.mobile}</p>
            </div>

            <Address userId={userId} />
          </div>
        );

      case "orders":
        return <Orders userId={userId} />;

      case "completed":
        return <CompletedOrders />;
      default:
        return null;
    }
  };

  return (
    <div className="hero w-full pt-10 pb-10 md:pb-20">
      <div className="w-11/12 md:w-10/12 mx-auto mt-10">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="flex items-center gap-3 mt-3">
          <p
            className={`cursor-pointer ${activeTab === "profile" ? "font-semibold" : ""
              }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </p>
          <p
            className={`cursor-pointer ${activeTab === "orders" ? "font-semibold" : ""
              }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </p>
          <p
            className={`cursor-pointer ${activeTab === "completed" ? "font-semibold" : ""
              }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Orders
          </p>
        </div>

        <div className="w-full mt-8">{renderContent()}</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <img
                className="w-5 cursor-pointer"
                src={closeImage}
                alt="close-image"
                loading="lazy"
                onClick={() => setIsModalOpen(false)}
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
                  onClick={() => setIsModalOpen(false)}
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
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirm Account Deletion"
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={confirmDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
