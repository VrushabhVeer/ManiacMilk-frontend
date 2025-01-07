import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile, updateProfile, deleteUserAccount } from "../redux/profileSlice";
import Orders from "../components/profile/Orders";
import Modal from "../components/common/Modal";
import toast from "react-hot-toast";
import ProfileInfo from "../components/profile/ProfileInfo";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: profile, status, error } = useSelector((state) => state.profile);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (error && error.status === 401) {
      navigate("/login");
    }
  }, [error, navigate]);

  const handleUpdateProfile = async (formData) => {
    try {
      await dispatch(updateProfile(formData)); // Update profile
      await dispatch(fetchProfile()); // Fetch updated profile explicitly
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteUserAccount());
      toast.success("Account deleted successfully!");
      localStorage.clear();
      navigate("/");
    } catch {
      toast.error("Failed to delete account.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileInfo
            profile={profile}
            onEdit={handleUpdateProfile}
            // onDelete={() => dispatch(deleteUserAccount())}
            onDelete={() => setIsDeleteModalOpen(true)}
            userId={userId}
          />
        );
      case "orders":
        return <Orders userId={userId} />;
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
            className={`cursor-pointer ${activeTab === "profile" ? "font-semibold" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </p>
          <p
            className={`cursor-pointer ${activeTab === "orders" ? "font-semibold" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </p>
        </div>
        <div className="w-full mt-8">{renderContent()}</div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirm Account Deletion"
        message="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={handleDeleteAccount}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
