import React, { useState, useEffect } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet";

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
        <title>ReadMeMaker - Best README Crafter</title>
        <meta
          name="description"
          content="Easily create professional README files with our tool. Perfect for developers who want to document their projects effortlessly."
        />
        <meta
          name="keywords"
          content="readme, markdown, readmemaker, create readme, readme templates, markdown templates"
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
