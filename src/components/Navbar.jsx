import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/user";
import { IoIosLogOut } from "react-icons/io";
import { specialties } from "../utils/index";
import { deleteWallet } from "../redux/wallet";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

function Navbar() {
  const user = useSelector((state) => state.authReducer);
  const wallet = useSelector((state) => state.walletReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(deleteWallet({ id: "", balance: 0 }));
    navigate("/login");
  };

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
            ({specialties[`${window.localStorage.getItem("specialty")}`]})
          </span>
        ) : (
          ""
        )}
        {user.name && (
          <span className="text-sm text-gray-700">: {user.name}</span>
        )}
      </div>
      <div className="flex items-center gap-6">
        {window.localStorage.getItem("role") !== "admin" && (
          <>
            <span className="text-gray-700 font-semibold">
              Balance: {wallet.balance} Da
            </span>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-400">
              Deposit
              <RiMoneyDollarCircleFill />
            </button>
          </>
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
