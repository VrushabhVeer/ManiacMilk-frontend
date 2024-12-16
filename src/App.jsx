import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AllRoutes from "./routes/AllRoutes";
import { useEffect } from "react";
import { restoreSession } from "./redux/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  );
}

export default App;
