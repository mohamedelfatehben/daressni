/* eslint-disable react/prop-types */
import { useState } from "react";
import { loginApi } from "../apis/auth";
import Toast from "../components/common/Toast";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/user";
import { Link } from "react-router-dom";

// Header Component
function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="" className="h-40 w-40" src="/img/hak.png" />
      </div>
      <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}

// Input Component
const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass = "",
  onBlur,
}) {
  return (
    <div className="">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={fixedInputClass + customClass}
        placeholder={placeholder}
        onBlur={onBlur}
      />
    </div>
  );
}

// FormExtra Component
function FormExtra() {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-900"
        >
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a
          href="#"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

// FormAction Component
function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

// Login Component
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

    loginApi({ email, password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.localStorage.setItem("token", res.data);
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
          console.log(res);
          handleShowToast("error", res.response.data);
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        handleShowToast("error", error.response.statusText || "Login failed");
      });

    setEmailError("");
    setPasswordError("");
  };
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet?"
          linkName="Signup"
          linkUrl="/sign-up"
        />
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="space-y-4">
            <Input
              handleChange={(e) => {
                if (!e.target.value) {
                  setEmailError("Email is required");
                } else {
                  setEmailError("");
                }
                setEmail(e.target.value);
              }}
              value={email}
              labelText="Email address"
              labelFor="email-address"
              id="email-address"
              name="email"
              type="email"
              isRequired={true}
              placeholder="Email address"
              customClass={emailError && "border-red-500"}
              onBlur={handleEmailBlur}
            />
            {emailError && <p className="text-sm text-red-600">{emailError}</p>}
            <Input
              handleChange={(e) => {
                if (!e.target.value) {
                  setPasswordError("Password is required");
                } else {
                  setPasswordError("");
                }
                setPassword(e.target.value);
              }}
              value={password}
              labelText="Password"
              labelFor="password"
              id="password"
              name="password"
              type="password"
              isRequired={true}
              placeholder="Password"
              customClass={passwordError && "border-red-500"}
              onBlur={handlePasswordBlur}
            />
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
          </div>
          <FormExtra />
          <FormAction handleSubmit={handleLogin} text="Login" />
        </form>
      </div>
      <Toast type={toastType} message={toastMessage} show={showToast} />
    </div>
  );
}

export default Login;
