import { useState } from "react";
import { loginApi } from "../apis/auth";
import Toast from "../components/common/Toast";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../reducers";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const handleShowToast = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
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
  const getRole = (roleText) => {
    if (roleText.includes("ADMIN")) {
      return "admin";
    }
    if (roleText.includes("TEACHER")) {
      return "teacher";
    }
    if (roleText.includes("STUDENT")) {
      return "student";
    }
  };
  const handleLogin = async () => {
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
    const res = await loginApi({ email, password });
    if (res.status === 200) {
      window.localStorage.setItem("token", res.data);
      //decoding the token
      const data = decodeToken(res.data);
      window.localStorage.setItem("email", data.sub);
      window.localStorage.setItem("role", getRole(data.roles));
      dispatch(
        loginUser({
          token: res.data,
          email: data.sub,
          role: getRole(data.roles),
        })
      );
      navigate("/");
    } else {
      handleShowToast("error", res.data);
    }
    // Reset errors
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-200">
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
        <p className="mt-4 text-gray-600 text-sm cursor-pointer">
          You do not have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </form>
      <Toast type={toastType} message={toastMessage} show={showToast} />
    </div>
  );
}

export default Login;
