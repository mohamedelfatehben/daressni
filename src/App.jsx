import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Teachers from "./pages/Teachers";
import Groups from "./pages/Groups";
import Payments from "./pages/Payments";
import Students from "./pages/Students";

function App() {
  const connected = true;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<Navigate to={connected ? "/" : "/login"} />}
          />
          {connected ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:id" element={<Groups />} />
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
