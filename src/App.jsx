import { useState } from 'react';
import { auth } from './firebase';
import { signInWithPhoneNumber } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import './app.css';
console.log("Firebase version:", import.meta.env);

function App() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const FAKE_OTP = "123456"; // Temporary OTP for development

const handleSendOTP = () => {
  try {
    // 👇 Comment this block to skip Firebase for now
    /*
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha verified", response);
          },
        }
      );
    }

    const appVerifier = window.recaptchaVerifier;

    auth.signInWithPhoneNumber(phone, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        alert("OTP sent!");
      })
      .catch((error) => {
        console.error("OTP error:", error);
        alert("Failed to send OTP");
      });
    */

    // ✅ Fake OTP Flow for now (keep this temporary)
    alert(`OTP sent!\nUse this demo OTP: ${FAKE_OTP}`);
    // Set fake confirmationResult to simulate Firebase response
    setConfirmationResult({ confirm: (inputOTP) => {
      return new Promise((resolve, reject) => {
        if (inputOTP === FAKE_OTP) {
          resolve({ user: { phoneNumber: phone } });
        } else {
          reject();
        }
      });
    }});
  } catch (e) {
    console.error("Recaptcha setup failed:", e);
    alert("Recaptcha setup failed. Try refreshing.");
  }
};

const handleVerifyOTP = () => {
  if (!otp || !confirmationResult) return;
  confirmationResult.confirm(otp)
    .then((result) => {
      console.log("Login successful:", result.user);
      setIsLoggedIn(true);
    })
    .catch(() => {
      alert("Invalid OTP. Try 123456");
    });
};


  const handleLogout = () => {
    setIsLoggedIn(false);
    setPhone('');
    setOtp('');
    setConfirmationResult(null);
    window.recaptchaVerifier = null; // reset recaptcha if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      {!isLoggedIn ? (
        <div className="bg-white p-6 rounded shadow-md w-80 text-center">
          <h2 className="text-2xl font-bold mb-4">OTP Login</h2>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-3"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={handleSendOTP}
          >
            Send OTP
          </button>

          <input
            className="w-full p-2 border border-gray-300 rounded mt-4 mb-3"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={handleVerifyOTP}
          >
            Verify OTP
          </button>

          <div id="recaptcha-container" />
        </div>
      ) : (
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold animate-pulse mb-4">🎉 Welcome!</h1>
          <p className="text-lg mb-6">You're successfully logged in.</p>
          <button
            className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
