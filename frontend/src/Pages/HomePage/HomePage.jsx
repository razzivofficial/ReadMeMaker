import React, { useState, useEffect } from "react";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          ReadMeMaker - Create Professional README Files | Best README Generator
        </title>
        <meta
          name="description"
          content="Easily create professional README files with our tool. Perfect for developers who want to document their projects effortlessly."
        />
        <meta
          name="keywords"
          content="readme, markdown, readmemaker, create readme, readme templates, markdown templates"
        />

        {/* Structured Data using JSON-LD */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://readmemaker.com",
              "name": "ReadMeMaker",
              "description": "Easily create professional README files with our tool. Perfect for developers who want to document their projects effortlessly.",
              "publisher": {
                "@type": "Organization",
                "name": "ReadMeMaker Inc.",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://readmemaker.com/logo.png"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://readmemaker.com/search?query={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
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
