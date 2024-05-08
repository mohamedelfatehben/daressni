/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex items-end flex-col min-h-screen">
      <Sidebar />
      <div style={{ width: "calc(100vw - 4rem)" }} className="flex-grow">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

export default Layout;
