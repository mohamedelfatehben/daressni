import { useState } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const Menus = [
    { title: "Home", src: "Home", href: "/", authorized: true },
    {
      title: "Teachers",
      src: "Teacher",
      authorized: window.localStorage.getItem("role") === "admin",
      href: "/teachers",
    },
    {
      title: "Groups",
      src: "Groups",
      authorized: window.localStorage.getItem("role") === "teacher" || true,
      href: "/groups",
    },
    {
      title: "Students",
      src: "students",
      authorized: window.localStorage.getItem("role") === "admin" || true,
      href: "/students",
    },
  ];

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={` ${
        open ? "w-72" : "w-fit "
      } bg-dark-purple h-screen p-2  pt-8 duration-300 bg-slate-600 fixed top-0 left-0`}
    >
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 w-12 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "hidden"
          }`}
        >
          Daressni
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => {
          return (
            <a
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-500 text-gray-300 hover:text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                location === Menu.href && "bg-slate-500"
              } 
            ${location.pathname === Menu?.href && "text-white"}
            `}
              onClick={() => {
                if (Menu.onClick) {
                  Menu.onClick();
                }
              }}
              href={Menu.href || "#"}
            >
              <img src={`./src/assets/${Menu.src}.png`} className="w-8" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
