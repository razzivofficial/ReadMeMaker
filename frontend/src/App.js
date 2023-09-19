import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Documentation from "./Pages/Documentation/Documentation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<AboutUs />} />
          <Route exact path="/documentation" element={<Documentation />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
