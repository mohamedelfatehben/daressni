import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import { useEffect } from "react";
import { getInfoData, getUserWallet } from "./apis/auth";
//teacher pages
import Groups from "./pages/teacher/Groups";
import Group from "./pages/teacher/Group";
import Payments from "./pages/teacher/Payments";
//students pages
import Students from "./pages/teacher/Students";
import StudentGroups from "./pages/student/Groups";
import StudentGroup from "./pages/student/Group";
import StudentPayments from "./pages/student/Payments";
import Teachers from "./pages/admin/Teachers";
import Documents from "./pages/teacher/Documents";
import AdminGroups from "./pages/admin/Groups";
import { logoutUser, setUserInfo } from "./redux/user";
import { setWalletInfo } from "./redux/wallet";
import ForumHome from "./pages/forum/pages/ForumHome";
import Forum from "./pages/forum/pages/Forum";
import "react-toastify/dist/ReactToastify.css";
import CreatePost from "./pages/forum/pages/CreatePost";
import UpdatePost from "./pages/forum/pages/UpdatePost";
import { Toaster } from "sonner";

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
      )
        .then((res) => {
          if (res.status === 200) {
            if (window.localStorage.getItem("role") === "teacher") {
              window.localStorage.setItem("module", res.data.moduleName);
            } else if (window.localStorage.getItem("role") === "student") {
              window.localStorage.setItem("specialty", res.data.speciality);
            }
            dispatch(
              setUserInfo({
                name: res.data.firstName + " " + res.data.lastName,
                id: res.data.id,
                userId: res.data.userId,
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.statusText === "Unauthorized") {
            handleLogout();
          }
        });
    }
  }, [user.token]);

  useEffect(() => {
    if (user.userId) {
      getUserWallet(user.userId)
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              setWalletInfo({
                id: res.data.id,
                balance: res.data.balance,
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user.userId]);
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
                <Route path="/groups" element={<AdminGroups />} />
                
              </>
            )}
            {user.role === "teacher" && (
              <>
                <Route path="/teacher/groups" element={<Groups />} />
                <Route path="/teacher/groups/:id" element={<Group />} />
                <Route path="/teacher/payments" element={<Payments />} />
                <Route path="/teacher/students" element={<Students />} />
                <Route path="/teacher/documents" element={<Documents />} />
                <Route path="/forum" element={<ForumHome />} />
                <Route path="/forum/:id" element={<Forum />} />
                <Route path="/forum/create" element={<CreatePost/>}/>
                
              </>
            )}
            {user.role === "student" && (
              <>
                <Route path="/student/groups" element={<StudentGroups />} />
                <Route path="/student/groups/:id" element={<StudentGroup />} />
                <Route path="/student/payments" element={<StudentPayments />} />
                <Route path="/forum" element={<ForumHome />} >
                  <Route path="/forum/:idGrp" element={<Forum />} />
                  <Route path="/forum/create" element={<CreatePost/>}/>
                  <Route path="/forum/update-post/:id" element={<UpdatePost/>} />
                  <Route path="/forum" element={<Navigate to="/forum/general" />} />  {/* this is the first route that appears when loading forum */}
                </Route>
                
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
      <Toaster/>
      
    </BrowserRouter>
  );
}

export default App;
