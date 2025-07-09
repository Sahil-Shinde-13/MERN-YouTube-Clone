import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegUserCircle, FaSearch, FaTimes, FaYoutube } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";


function Header({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 450);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
  }

  return (
    <>
      <header className="bg-white shadow-sm px-4 py-2 w-full flex justify-between fixed items-center top-0 z-20 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-xl p-1 hover:bg-gray-100 cursor-pointer rounded-full">
            <GiHamburgerMenu />
          </button>
          <div onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer flex items-center text-red-600">
            <FaYoutube className="mr-1" size={24} />
            <span className="hidden sm:inline">YouTube Clone</span>
          </div>
        </div>

        {/* For Desktop view- Search Bar */}
        {!isMobile && (
          <form onSubmit={handleSearch} className="flex flex-grow items-center max-w-2xl mx-4">
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"/>
            <button type="submit"
              className="bg-gray-100 px-4 py-2.5 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200 flex items-center justify-center">
              <FaSearch size={18} />
            </button>
          </form>
        )}

        {/*For Mobile Search Icon */}
        {isMobile && !showMobileSearch && (
          <button onClick={() => setShowMobileSearch(true)}
            className="text-xl p-2 hover:bg-gray-100 rounded-full mx-4">
            <FaSearch />
          </button>
        )}

        {/* User Info */}
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          {user ? (
            <>
              <span>{user.username}</span>
              <FaRegUserCircle className="text-xl" />
              <button onClick={handleLogout} className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
                Logout
              </button>
            </>
          ):(
            <button onClick={()=> navigate("/login")} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer">
                Sign In
            </button>
          )}
          
        </div>
      </header>

      {/* overlay mobile search */}
      {isMobile && showMobileSearch && (
        <div className="fixed top-0 left-0 right-0 bg-white p-2 z-30 flex items-center gap-2 shadow-md border-b">
          
          <form onSubmit={handleSearch} className="flex-grow flex items-center">
            <input type="text" autoFocus placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"/>
              <button type="submit"
                className="bg-gray-100 px-4 py-2.5 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200 flex items-center justify-center">
                <FaSearch size={18} />
            </button>
          </form>
          
          <button onClick={() => setShowMobileSearch(false)}
            className="text-xl p-2 ml-2 hover:bg-gray-100 rounded-full">
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
