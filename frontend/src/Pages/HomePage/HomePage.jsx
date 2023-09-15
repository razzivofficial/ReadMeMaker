import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PreElementAdder from "../../Components/ElementAdder/PreElementAdder";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Footer />
      <PreElementAdder />
    </div>
  );
}
