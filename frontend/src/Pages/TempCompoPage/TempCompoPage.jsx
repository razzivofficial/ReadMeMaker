import React, { useState, useEffect } from "react";
import EditorCard from "../../Components/EditorCard/EditorCard";
import TempCompoLoader from "../../Components/Loader/TempCompoLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  if(!localStorage.getItem('authToken')){
    toast.warning("Login First")
    navigate('/')
  }
  
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
