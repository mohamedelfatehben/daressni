import { useEffect, useState } from "react";
import { getInfoData } from "../apis/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers";

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
    <div className="flex justify-between w-full px-4 py-2 shadow-lg">
      <div className="capitalize">
        {window.localStorage.getItem("role")}
        {window.localStorage.getItem("role") === "teacher" ? (
          <span className="text-xs mx-1">
            ({window.localStorage.getItem("module")})
          </span>
        ) : window.localStorage.getItem("role") === "teacher" ? (
          <span className="text-xs mx-1">
            ({window.localStorage.getItem("specialty")})
          </span>
        ) : (
          ""
        )}
        {name && ` : ${name}`}{" "}
      </div>
      <div className="font-semibold flex gap-x-4">
        {/* {window.localStorage.getItem("role") === "student" && ( */}
        <span>Balance : 2000 Da</span>
        {/* )} */}
        <span>|</span>
        <img
          src="/logout.png"
          alt=""
          className="w-6 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Navbar;
