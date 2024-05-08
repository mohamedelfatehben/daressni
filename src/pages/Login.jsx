import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError("Email is required.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!password.trim()) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = () => {
    if (!email.trim()) {
      setEmailError("Email is required.");
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
    }
    if (!email.trim() || !password.trim()) {
      return;
    }
    // Proceed with login logic
    // Example: Call your authentication API here

    // Reset errors
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emailError && "border-red-500"
            }`}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              if (!e.target.value) {
                setEmailError("Email is required");
              } else {
                setEmailError("");
              }
              setEmail(e.target.value);
            }}
            onBlur={handleEmailBlur}
          />
          {emailError && (
            <p className="text-red-500 text-xs italic">{emailError}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              passwordError && "border-red-500"
            }`}
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => {
              if (!e.target.value) {
                setPasswordError("Password is required");
              } else {
                setPasswordError("");
              }
              setPassword(e.target.value);
            }}
            onBlur={handlePasswordBlur}
          />
          {passwordError && (
            <p className="text-red-500 text-xs italic">{passwordError}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
