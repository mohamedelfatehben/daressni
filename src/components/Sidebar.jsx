import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const Menus = [
    {
      title: "Home",
      src: "Home",
      href: "/",
      authorized: window.localStorage.getItem("role") !== "admin",
    },
    {
      title: "Teachers",
      src: "Teacher",
      authorized: window.localStorage.getItem("role") === "admin",
      href: "/",
    },
    {
      title: "Groups",
      src: "Groups",
      authorized: true,
      href:
        window.localStorage.getItem("role") === "teacher"
          ? "/teacher/groups"
          : window.localStorage.getItem("role") === "student"
          ? "/student/groups"
          : "/groups",
    },
    {
      title: "Students",
      src: "students",
      authorized: window.localStorage.getItem("role") === "teacher",
      href: "/" + window.localStorage.getItem("role") + "/students",
    },
    {
      title: "Documents",
      src: "documents",
      authorized: window.localStorage.getItem("role") === "teacher",
      href: "/" + window.localStorage.getItem("role") + "/documents",
    },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`${
        open ? "w-64" : "w-20"
      } bg-white shadow-md h-screen p-5 pt-8 duration-300 fixed z-20 top-0 left-0 border-r border-gray-200`}
    >
      <div className="flex items-center justify-center">
        <img
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          className={`cursor-pointer duration-500 w-12 ${
            open && "rotate-[360deg]"
          }`}
          alt="logo"
        />
        <h1
          className={`text-gray-900 origin-left font-extrabold text-xl duration-200 ml-4 ${
            !open && "hidden"
          }`}
        >
          Daressni
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => {
          if (!Menu.authorized) {
            return null;
          }
          return (
            <li key={index} className="mb-2">
              <a
                href={Menu.href || "#"}
                className={`flex items-center p-2 text-gray-700 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-colors duration-200 ${
                  location.pathname === Menu.href
                    ? "bg-purple-200 text-purple-700"
                    : ""
                }`}
              >
                <img
                  src={`/img/${Menu.src}.png`}
                  className="w-6"
                  alt={`${Menu.title} icon`}
                />
                <span
                  className={`ml-4 origin-left duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {Menu.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
