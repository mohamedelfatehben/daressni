import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Teachers from "./pages/Teachers";
import Groups from "./pages/Groups";
import Payments from "./pages/Payments";
import Students from "./pages/Students";
import Group from "./pages/Group";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Navigate
                to={
                  window.localStorage.getItem("token") !== "" ? "/" : "/login"
                }
              />
            }
          />
          {window.localStorage.getItem("token") !== "" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:id" element={<Group />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/students" element={<Students />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
