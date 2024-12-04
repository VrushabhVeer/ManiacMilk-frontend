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

  console.log("first", orders);

  return (
    <div className="">
      <div></div>
    </div>
  );
};

export default Admin;
