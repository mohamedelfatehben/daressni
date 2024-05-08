import { useState } from "react";

function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    type: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in form) {
      if (!form[key].trim()) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required.`;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);

    // Proceed only if there are no errors
    if (!Object.values(newErrors).some((error) => error)) {
      // Proceed with signup logic
      console.log("Form submitted successfully.");
    } else {
      console.log("Form submission failed. Please fix errors.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md flex flex-col items-center gap-y-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
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
            <p className="text-red-500 text-xs italic">{errors.firstName}</p>
          )}
        </div>
        <div className="w-full">
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
        <div className="w-full">
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
        <div className="w-full">
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
        <div className="w-full">
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
            <option value="">Select Type</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs italic">{errors.type}</p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-fit mx-auto"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
