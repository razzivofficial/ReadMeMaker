// App.js
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Documentation from "./Pages/Documentation/Documentation";
import Editor from "./Pages/Editor/Editor";
import ErrorPage from "./Pages/Error/ErrorPage";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Profile from "./Pages/Profile/Profile";
import TempCompoPage from "./Pages/TempCompoPage/TempCompoPage"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/templatecompo" element={<TempCompoPage />} />
        <Route path="/profile/:useremail" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
