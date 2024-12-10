import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Address from "../components/common/Address";
import { getProfile } from "../utils/apis";
import Orders from "../components/profile/Orders";
import CompletedOrders from "../components/profile/CompletedOrders";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

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

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="border p-5 rounded-md">
            <div className="mb-5">
              <p className="font-semibold">{profile?.fullname}</p>
              <p className="font-semibold mt-2">Email</p>
              <p className="text-gray-600">{profile?.email}</p>
              <p className="font-semibold mt-2">Mobile</p>
              <p className="text-gray-600">{profile?.mobile}</p>
            </div>

            <address>Address ADD here</address>
          </div>
        );

      case "orders":
        return <Orders userId={profile?._id} />;

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
            /Orders
          </p>
          <p
            className={`cursor-pointer ${activeTab === "completed" ? "font-semibold" : ""
              }`}
            onClick={() => setActiveTab("completed")}
          >
            /Completed Orders
          </p>
        </div>

        <div className="w-full mt-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
