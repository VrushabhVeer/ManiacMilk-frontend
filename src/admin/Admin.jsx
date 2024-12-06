import { useEffect, useState } from "react";
import { getAllOrders } from "../utils/apis";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchOrders();
  }, []);

  console.log("orders", orders);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto mb-10 md:mb-20 pt-10">
      <div className="text-gray-700 gap-2  flex items-center">
        
          <p>Home</p>
          <p>/Orders</p>
          <p>/Users</p>
          <p>/subscribers</p>
        
      </div>
    </div>
  );
};

export default Admin;
