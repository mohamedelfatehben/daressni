function Navbar() {
  return (
    <div className="flex justify-between w-full px-4 py-2 shadow-lg">
      <div className="font-semibold">
        {/* {window.localStorage.getItem("role") === "student" && ( */}
        <span>Balance : 2000 Da</span>
        {/* )} */}
      </div>
      <img
        src="/logout.png"
        alt=""
        className="w-6 cursor-pointer"
        onClick={() => {
          window.localStorage.setItem("role", "");
          window.localStorage.setItem("token", "");
        }}
      />
    </div>
  );
}

export default Navbar;
