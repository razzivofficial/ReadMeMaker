import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import ElementAdder from "../../Components/ElementAdder/ElementAdder";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <ElementAdder />
      <Footer />
    </div>
  );
}
