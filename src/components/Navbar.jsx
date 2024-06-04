import { useEffect, useState } from "react";
import { getInfoData } from "../apis/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers";
import { IoIosLogOut } from "react-icons/io";


function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleLogout = () => {
    window.localStorage.setItem("role", "");
    window.localStorage.setItem("email", "");
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("specialty", "");
    window.localStorage.setItem("module", "");
    dispatch(
      logoutUser({
        id: "",
        token: "",
        name: "",
        email: "",
        role: "",
      })
    );
    navigate("/login");
  };

  const getData = async () => {
    const res = await getInfoData(
      window.localStorage.getItem("role"),
      window.localStorage.getItem("email")
    );
    if (res.status === 200) {
      setName(res.data.firstName + " " + res.data.lastName);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex justify-between items-center w-full px-6 py-3 shadow-lg bg-white">
      <div className="flex items-center gap-2 text-gray-700">
        <span className="capitalize font-medium">
          {window.localStorage.getItem("role")}
        </span>
        {window.localStorage.getItem("role") === "teacher" ? (
          <span className="text-sm text-gray-500">
            ({window.localStorage.getItem("module")})
          </span>
        ) : window.localStorage.getItem("role") === "student" ? (
          <span className="text-sm text-gray-500">
            ({window.localStorage.getItem("specialty")})
          </span>
        ) : (
          ""
        )}
        {name && (
          <span className="text-sm text-gray-700">
            : {name}
          </span>
        )}
      </div>
      <div className="flex items-center gap-6">
        {window.localStorage.getItem("role") === "student" && (
          <span className="text-gray-700 font-semibold">
            Balance: 2000 Da
          </span>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
        >
          Logout

          <IoIosLogOut className="text-white text-lg" />

        </button>
      </div>
    </div>
  );
}

export default Navbar;
