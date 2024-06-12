/* eslint-disable react/prop-types */
import { useState } from "react";
import { signUpApi } from "../apis/auth";
import Toast from "../components/common/Toast";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";

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

// Header Component
function Header({ heading, paragraph, linkName, linkUrl = "#" }) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="" className="h-14 w-14" src="/img/hak.png" />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
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
    <div className="my-5">
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

// FormAction Component
function FormAction({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
  isSubmitting,
}) {
  return (
    <>
      {type === "Button" ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          {isSubmitting ? <Spinner /> : text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "student", // Default type is 'student'
    speciality: "",
    moduleName: "",
    cv: null, // Add a cv field to store the uploaded file
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
    speciality: "",
    moduleName: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const addToDrive = (file) => {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        var rawLog = reader.result.split(",")[1];
        var dataSend = {
          dataReq: { data: rawLog, name: file.name, type: file.type },
          fname: "uploadFilesToGoogleDrive",
        };
        fetch(
          "https://script.google.com/macros/s/AKfycbyA99FoDRV1U-qe-nJJIfntQbpH_JW2qr9mWVW2RtD-SingL-MBSNh9N-1wohTaUxUN/exec",
          { method: "POST", body: JSON.stringify(dataSend) }
        )
          .then((res) => res.json())
          .then((data) => {
            resolve(data.url); // Resolve the promise with the URL
          })
          .catch((error) => reject(error));
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      cv: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in form) {
      if (
        typeof form[key] === "string" &&
        !form[key].trim() &&
        key !== "speciality" &&
        key !== "moduleName"
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
    } else if (form.type === "teacher" && !form.moduleName.trim()) {
      newErrors.module = "Module is required.";
    }

    setErrors(newErrors);

    // Proceed only if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      setIsSubmitting(true);
      try {
        let cvLink = "";
        if (form.type === "teacher") {
          cvLink = await addToDrive(form.cv);
          setForm({
            ...form,
            cv:
              cvLink ||
              "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
          });
        }
        const response = await signUpApi({
          ...form,
          cv:
            cvLink ||
            "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
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
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 py-4">
        <Header
          heading="Create your account"
          paragraph="Already have an account?"
          linkName="Login"
          linkUrl="/login"
        />
        {successMessage === "" ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
              <Input
                handleChange={(e) => {
                  if (!e.target.value) {
                    setErrors({
                      ...errors,
                      firstName: "First name is required",
                    });
                  } else {
                    setErrors({ ...errors, firstName: "" });
                  }
                  setForm({ ...form, firstName: e.target.value });
                }}
                value={form.firstName}
                labelText="First Name"
                labelFor="first-name"
                id="first-name"
                name="firstName"
                type="text"
                isRequired={true}
                placeholder="First Name"
                customClass={errors.firstName ? "border-red-500" : ""}
                onBlur={() => handleBlur("firstName", "First name")}
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div className="-space-y-px">
              <Input
                handleChange={(e) => {
                  if (!e.target.value) {
                    setErrors({ ...errors, lastName: "Last name is required" });
                  } else {
                    setErrors({ ...errors, lastName: "" });
                  }
                  setForm({ ...form, lastName: e.target.value });
                }}
                value={form.lastName}
                labelText="Last Name"
                labelFor="last-name"
                id="last-name"
                name="lastName"
                type="text"
                isRequired={true}
                placeholder="Last Name"
                customClass={errors.lastName ? "border-red-500" : ""}
                onBlur={() => handleBlur("lastName", "Last name")}
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>

            <div className="-space-y-px">
              <Input
                handleChange={(e) => {
                  if (!e.target.value) {
                    setErrors({ ...errors, email: "Email is required" });
                  } else {
                    setErrors({ ...errors, email: "" });
                  }
                  setForm({ ...form, email: e.target.value });
                }}
                value={form.email}
                labelText="Email"
                labelFor="email-address"
                id="email-address"
                name="email"
                type="email"
                isRequired={true}
                placeholder="Email"
                customClass={errors.email ? "border-red-500" : ""}
                onBlur={() => handleBlur("email", "Email")}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="-space-y-px">
              <Input
                handleChange={(e) => {
                  if (!e.target.value) {
                    setErrors({ ...errors, password: "Password is required" });
                  } else {
                    setErrors({ ...errors, password: "" });
                  }
                  setForm({ ...form, password: e.target.value });
                }}
                value={form.password}
                labelText="Password"
                labelFor="password"
                id="password"
                name="password"
                type="password"
                isRequired={true}
                placeholder="Password"
                customClass={errors.password ? "border-red-500" : ""}
                onBlur={() => handleBlur("password", "Password")}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="-space-y-px">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sign Up As:
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                onBlur={() => handleBlur("type", "Account type")}
                className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                  errors.type ? "border-red-500" : ""
                }`}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {errors.type && (
                <p className="mt-2 text-sm text-red-600">{errors.type}</p>
              )}
            </div>

            {form.type === "student" && (
              <div className="-space-y-px">
                <label
                  htmlFor="speciality"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Specialty:
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  value={form.speciality}
                  onChange={(e) =>
                    setForm({ ...form, speciality: e.target.value })
                  }
                  onBlur={() => handleBlur("speciality", "Specialty")}
                  className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                    errors.speciality ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a specialty</option>
                  {Object.keys(specialties).map((key) => (
                    <option key={key} value={key}>
                      {specialties[key]}
                    </option>
                  ))}
                </select>
                {errors.speciality && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.speciality}
                  </p>
                )}
              </div>
            )}

            {form.type === "teacher" && (
              <div className="-space-y-px">
                <label
                  htmlFor="moduleName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Module:
                </label>
                <select
                  id="moduleName"
                  name="moduleName"
                  value={form.moduleName}
                  onChange={(e) =>
                    setForm({ ...form, moduleName: e.target.value })
                  }
                  onBlur={() => handleBlur("moduleName", "Module")}
                  className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm ${
                    errors.module ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a module</option>
                  {Object.keys(modules).map((key) => (
                    <option key={key} value={key}>
                      {modules[key]}
                    </option>
                  ))}
                </select>
                {errors.moduleName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.moduleName}
                  </p>
                )}
              </div>
            )}

            {form.type === "teacher" && (
              <div className="-space-y-px">
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload CV:
                </label>
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            )}

            <FormAction
              handleSubmit={handleSubmit}
              text="Sign Up"
              isSubmitting={isSubmitting}
            />
          </form>
        ) : (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-green-600 text-lg text-center">
              {successMessage}
            </p>
          </div>
        )}

        <Toast show={showToast} type={toastType} message={toastMessage} />
      </div>
    </div>
  );
}

export default SignUp;
