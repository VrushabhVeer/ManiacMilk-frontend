import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
