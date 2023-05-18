import React, { useState } from "react";

function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleGenerateOTP = () => {
    // Make an API call to the server to generate OTP and send it via SMS
    fetch("http://localhost:3000/generate-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  };

  const handleVerifyOTP = () => {
    // Make an API call to the server to verify the entered OTP
    fetch("http://localhost:3000/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Login/Logout with OTP</h1>
      <label>
        Phone:
        <input type="text" value={phone} onChange={handlePhoneChange} />
      </label>
      <br />
      <button onClick={handleGenerateOTP}>Generate OTP</button>
      <br />
      <label>
        OTP:
        <input type="text" value={otp} onChange={handleOtpChange} />
      </label>
      <br />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      <br />
      <p>{message}</p>
    </div>
  );
}

export default App;
