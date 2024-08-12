import React, { useState, useEffect } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  }, []);

  return (
    <>
      <Helmet>
        <title>ReadMeMaker - Best README Markdown Generator</title>
        <meta
          name="description"
          content="Easily create professional README files with our generator. Perfect for developers who want to document their projects effortlessly."
        />
        <meta
          name="keywords"
          content="readme, readme generator, markdown, create readme, readme templates"
        />
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeroSection />
        </>
      )}
    </>
  );
}
