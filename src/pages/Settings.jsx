import { useState } from "react";
import Layout from "../components/Layout";

function Settings() {
  // State for personal information form
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  // State for password reset form
  const [passwordReset, setPasswordReset] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Function to handle changes in personal information form
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  // Function to handle changes in password reset form
  const handlePasswordResetChange = (e) => {
    const { name, value } = e.target;
    setPasswordReset({
      ...passwordReset,
      [name]: value,
    });
  };

  // Function to handle submission of personal information form
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    // Logic to submit personal information
  };

  // Function to handle submission of password reset form
  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();
    // Logic to submit password reset
  };

  return (
    <Layout>
      <div className="p-4">
        {/* Personal Information Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Update Personal Information
          </h2>
          <form onSubmit={handlePersonalInfoSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700"
              >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={personalInfo.birthDate}
                onChange={handlePersonalInfoChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Update Personal Information
            </button>
          </form>
        </div>

        {/* Password Reset Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handlePasswordResetSubmit}>
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordReset.currentPassword}
                onChange={handlePasswordResetChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordReset.newPassword}
                onChange={handlePasswordResetChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordReset.confirmPassword}
                onChange={handlePasswordResetChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
