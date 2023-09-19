import React, { useState, useEffect } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Loader from "../../Components/Loader/Loader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
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
