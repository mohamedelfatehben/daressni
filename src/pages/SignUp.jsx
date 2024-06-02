import { useState } from "react";
import { signUpApi } from "../apis/auth";
import Toast from "../components/common/Toast";

const specialties = {
  Moy_1: "Middle School Year 1",
  Moy_2: "Middle School Year 2",
  Moy_3: "Middle School Year 3",
  Moy_4: "Middle School Year 4",
  Science_1: "High School Science Year 1",
  Let_1: "High School Literature Year 1",
  Lang_2: "High School Languages Year 2",
  Lang_3: "High School Languages Year 3",
  Philo_2: "High School Philosophy Year 2",
  Philo_3: "High School Philosophy Year 3",
  Math_2: "High School Mathematics Year 2",
  Math_3: "High School Mathematics Year 3",
  MT_2: "High School Technical Mathematics Year 2",
  MT_3: "High School Technical Mathematics Year 3",
  Science_2: "High School Science Year 2",
  Science_3: "High School Science Year 3",
  Gest_2: "High School Management Year 2",
  Gets_3: "High School Management Year 3",
};

const modules = {
  ARABIC: "Arabic",
  ENGLISH: "English",
  FRENCH: "French",
  MATHEMATICS: "Mathematics",
  PHYSICS: "Physics",
  SCIENCE: "Science",
};

function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "student", // Default type is 'student'
    speciality: "",
    module: "",
    cv: null, // Add a cv field to store the uploaded file
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
    speciality: "",
    module: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (e) => {
    const { name, value, placeholder } = e.target;
    if (!value) {
      setErrors({
        ...errors,
        [name]: `${placeholder || name} is required`,
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (field, placeholder) => {
    if (!form[field].trim()) {
      setErrors({
        ...errors,
        [field]: `${placeholder} is required.`,
      });
    } else {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      cv: file,
    });
  };

  // const uploadToDrive = async (files) => {
  //   return;
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in form) {
      if (
        typeof form[key] === "string" &&
        !form[key].trim() &&
        key !== "speciality" &&
        key !== "module"
      ) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      } else {
        newErrors[key] = "";
      }
    }

    if (form.type === "student" && !form.speciality.trim()) {
      newErrors.speciality = "Specialty is required.";
    } else if (form.type === "teacher" && !form.module.trim()) {
      newErrors.module = "Module is required.";
    }

    setErrors(newErrors);

    // Proceed only if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      try {
        setForm({
          ...form,
          cv: "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
        });
        const response = await signUpApi({
          ...form,
          cv: "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
        });
        console.log("Form submitted successfully.", response.data);
        if (form.type === "student") {
          setToastType("success");
          setToastMessage("Sign up successful!");
          setShowToast(true);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          setToastType("success");
          setToastMessage("Sign up successful!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            setSuccessMessage(
              "Your account will be reviewed and confirmed by the website administrators."
            );
          }, 2000);
        }
        // Handle success (e.g., show a success message, redirect, etc.)
      } catch (error) {
        console.log("Form submission failed. Please fix errors.", error);
        // Handle error (e.g., show an error message)
      }
    } else {
      console.log("Form submission failed. Please fix errors.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gray-200">
      {successMessage === "" ? (
        <form
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-2xl flex flex-col items-center gap-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Sign Up</h2>

          <div className="flex gap-x-1 w-full flex-col sm:flex-row">
            <div className="w-full sm:flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.firstName && "border-red-500"
                }`}
                id="firstName"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName", "First name")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="w-full sm:flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.lastName && "border-red-500"
                }`}
                id="lastName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName", "Last name")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs italic">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex gap-x-1 w-full flex-col sm:flex-row">
            <div className="w-full sm:flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email && "border-red-500"
                }`}
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email", "Email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="w-full sm:flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && "border-red-500"
                }`}
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password", "Password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex gap-x-1 w-full flex-col sm:flex-row">
            <div className="w-full sm:flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.type && "border-red-500"
                }`}
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                onBlur={() => handleBlur("type", "Type")}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs italic">{errors.type}</p>
              )}
            </div>
            {form.type === "student" && (
              <div className="w-full sm:flex-grow">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="speciality"
                >
                  Speciality
                </label>
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.speciality && "border-red-500"
                  }`}
                  id="speciality"
                  name="speciality"
                  value={form.speciality}
                  onChange={handleChange}
                  onBlur={() => handleBlur("speciality", "Speciality")}
                >
                  <option value={""}>Select Speciality</option>
                  {Object.entries(specialties).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.speciality && (
                  <p className="text-red-500 text-xs italic">
                    {errors.speciality}
                  </p>
                )}
              </div>
            )}
            {form.type === "teacher" && (
              <div className="w-full sm:flex-grow">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="module"
                >
                  Module
                </label>
                <select
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.module && "border-red-500"
                  }`}
                  id="module"
                  name="module"
                  value={form.module}
                  onChange={handleChange}
                  onBlur={() => handleBlur("module", "Module")}
                >
                  <option value="">Select Module</option>
                  {Object.entries(modules).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.module && (
                  <p className="text-red-500 text-xs italic">{errors.module}</p>
                )}
              </div>
            )}
          </div>
          {form.type === "teacher" && (
            <div className="w-full sm:flex-grow">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cv"
              >
                CV (Curriculum Vitae)
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.cv && "border-red-500"
                }`}
                id="cv"
                type="file"
                name="cv"
                onChange={handleFileChange}
              />
              {errors.cv && (
                <p className="text-red-500 text-xs italic">{errors.cv}</p>
              )}
            </div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign Up
          </button>
          <p className="mt-4 text-gray-600 text-sm cursor-pointer">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign in here
            </a>
          </p>
        </form>
      ) : (
        <div className="bg-white w-full max-w-2xl text-center p-12">
          <h1 className="text-blue-600 text-4xl font-bold">
            Signed up successfully
          </h1>
          <h4 className="text-xl font-semibold">{successMessage}</h4>
        </div>
      )}
      <Toast type={toastType} message={toastMessage} show={showToast} />
    </div>
  );
}

export default SignUp;
