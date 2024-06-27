import React, { useState, useEffect } from "react";
import "./App.css";
import packageJson from "../package.json";

const App = () => {
  const currentVersion = packageJson.version;
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  // const [fullName, setFullName] = useState("");
  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");

    if (!storedVersion) {
      localStorage.setItem("appVersion", currentVersion);
    } else if (storedVersion < currentVersion) {
      setShowUpdatePopup(true);
    }
    // Check for updates periodically (every 1 hour)
    const checkForUpdates = setInterval(() => {
      const storedVersion = localStorage.getItem("appVersion");

      if (storedVersion && storedVersion < currentVersion) {
        setShowUpdatePopup(true);
      }
    }, 1000 * 10); // Check every 10 seconds

    return () => clearInterval(checkForUpdates); // Clean up interval on component unmount
  }, [currentVersion]);

  const handleUpdate = () => {
    localStorage.setItem("appVersion", currentVersion);
    window.location.reload();
  };

  // commented code is for the input handler (leave it commented)

  // const handleInputChange = (event) => {
  //   const fullNamePattern = /^[A-Za-z]+[0-9]* [A-Za-z]+[0-9]*$/;
  //   let value = event.target.value;

  //   // Allow only one space between words
  //   value = value.replace(/\s{2,}/g, " ");

  //   // Remove leading spaces
  //   if (value.startsWith(" ")) {
  //     value = value.trimStart();
  //   }

  //   // Remove trailing spaces only when the input field has only one space
  //   if (fullNamePattern.test(value)) {
  //     value = value.trimEnd();
  //   }

  //   setFullName(value);
  // };

  // const handleInputBlur = () => {
  //   setFullName(fullName.trim());
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setFullName(fullName.trim()); // Trim trailing spaces on submit
  //   // Submit logic here
  //   console.log("Submitted full name:", fullName, fullName.length);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the App</h1>
      </header>
      {showUpdatePopup && (
        <div className="update-popup">
          <p>A new version of the app is available!</p>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
      {/* <form onSubmit={handleSubmit} className="name-form">
        <input
          type="text"
          value={fullName}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="Enter your full name"
        />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default App;
