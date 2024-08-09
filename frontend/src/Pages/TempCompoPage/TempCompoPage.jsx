import React, { useState, useEffect } from "react";
import EditorCard from "../../Components/EditorCard/EditorCard";
import TempCompoLoader from "../../Components/Loader/TempCompoLoader";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <>
      {isLoading ? (
        <TempCompoLoader />
      ) : (
        <>
          <EditorCard />
        </>
      )}
    </>
  );
}
