import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { useEffect } from "react";
import { getInfoData } from "./apis/auth";
import { logoutUser, setUserInfo } from "./reducers";
//teacher pages
import Groups from "./pages/teacher/Groups";
import Group from "./pages/teacher/Group";
import Payments from "./pages/teacher/Payments";
//students pages
import Students from "./pages/teacher/Students";
import StudentGroups from "./pages/student/Groups";
import StudentGroup from "./pages/student/Group";
import StudentPayments from "./pages/student/Payments";
import Teachers from "./pages/Teachers";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);
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
    window.location.href = "/login";
  };
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      getInfoData(
        window.localStorage.getItem("role"),
        window.localStorage.getItem("email")
      ).then((res) => {
        if (res.status === 200) {
          if (window.localStorage.getItem("role") === "teacher") {
            window.localStorage.setItem("module", res.data.moduleName);
          } else if (window.localStorage.getItem("role") === "students") {
            window.localStorage.setItem("specialty", res.data.speciality);
          }
          dispatch(
            setUserInfo({
              name: res.data.firstName + " " + res.data.lastName,
              id: res.data.id,
            })
          );
        } else {
          handleLogout();
        }
      });
    }
  }, [user.token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={user.token ? "/" : "/login"} />}
        />
        {user.token ? (
          <>
            {user.role !== "admin" && <Route path="/" element={<Home />} />}
            {user.role === "admin" && (
              <>
                <Route path="/" element={<Teachers />} />
              </>
            )}
            {user.role === "teacher" && (
              <>
                <Route path="/teacher/groups" element={<Groups />} />
                <Route path="/teacher/groups/:id" element={<Group />} />
                <Route path="/teacher/payments" element={<Payments />} />
                <Route path="/teacher/students" element={<Students />} />
              </>
            )}
            {user.role === "student" && (
              <>
                <Route path="/student/groups" element={<StudentGroups />} />
                <Route path="/student/groups/:id" element={<StudentGroup />} />
                <Route path="/student/payments" element={<StudentPayments />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
