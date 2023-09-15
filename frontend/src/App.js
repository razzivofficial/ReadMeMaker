import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import necessary components from react-router-dom
import UserContextProvider from "./UserContextProvider"; // Import your UserContextProvider component
import Navbar from "./Navbar"; // Import your Navbar component
import HomePage from "./Pages/HomePage/HomePage"; // Import your HomePage component

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Navbar
          classDisplay={classDisplay}
          setClassDisplay={setClassDisplay}
          displayVal={displayVal}
          setDisplayVal={setDisplayVal}
          setLoginState={setLoginState}
          loginState={loginState}
        />
        <div style={intDivStyle}>
          <Routes>
            {/* <Route path="/nearby" element={<NearbyMap nonceVal={nonce} />} /> */}
            <Route
              path="/"
              element={<HomePage nonceVal={nonce} loginState={loginState} />}
            />
          </Routes>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
