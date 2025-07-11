import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegUserCircle, FaSearch, FaTimes, FaYoutube } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user data from Redux store
  const user = useSelector((state) => state.auth.user);

  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasChannel, setHasChannel] = useState(false); // Whether logged-in user has a channel

  // Handle responsive layout for mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 450);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if user has a channel only if logged in
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/channels/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?._id) setHasChannel(true);
        }
      } catch (err) {
        setHasChannel(false);
      }
    };

    if (user) fetchChannel();
  }, [user]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
    navigate("/", {state: {searchTerm: search.trim()}});
  }
  };
  
  return (
    <>
      {/* Main Header */}
      <header className="bg-white shadow-sm px-4 py-2 w-full flex justify-between fixed items-center top-0 z-20 border-b border-gray-200">
        
        {/* Logo & Sidebar */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="text-xl cursor-pointer p-1 hover:bg-gray-100 rounded-full">
            <GiHamburgerMenu />
          </button>
          <div onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer flex items-center text-red-600">
            <FaYoutube className="mr-1" size={24} />
            <span className="hidden sm:inline">YouTube Clone</span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        {!isMobile && (
          <form onSubmit={handleSearch} className="flex flex-grow items-center max-w-2xl mx-4">
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"/>
            <button type="submit" className="bg-gray-100 px-4 py-2.5 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200">
              <FaSearch size={18} />
            </button>
          </form>
        )}

        {/* Mobile Search Icon */}
        {isMobile && !showMobileSearch && (
          <button onClick={() => setShowMobileSearch(true)} className="text-xl p-2 hover:bg-gray-100 rounded-full mx-4">
            <FaSearch />
          </button>
        )}

        {/* Right Side: User or Sign In */}
        <div className="ml-4 relative">
          {!user ? (
            <button onClick={() => navigate("/login")} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
              Sign In
            </button>
          ) : (
            <>
              <button onClick={() => setShowDropdown(!showDropdown)}className="flex cursor-pointer items-center gap-1 text-sm text-gray-700 font-medium">
                <FaRegUserCircle className="text-xl" />
                {user?.username}
                <span className="ml-1">▼</span>
              </button>
        
        {/* Dropdown Menu */}
        {showDropdown && (
            <div className="absolute right-0 mt-2  bg-white shadow-md border rounded-md w-40 z-50">
            <button className="block w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => {setShowDropdown(false); // 👈 close dropdown
             navigate(hasChannel ? "/channel" : "/create-channel");}}>
                {hasChannel ? "My Channel" : "Create Channel"}
            </button>
            
            <button className="block w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {setShowDropdown(false);
                navigate("/upload");}}>
                Upload Video
            </button>
            
            <button className="block w-full cursor-pointer text-left px-4 py-2 text-red-500 hover:bg-red-50"
              onClick={() => {setShowDropdown(false);
                  dispatch(logout());navigate("/login");}}>
                  Logout
            </button>
            </div>
              )}
          </>
          )}
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isMobile && showMobileSearch && (
        <div className="fixed top-0 left-0 right-0 bg-white p-2 z-30 flex items-center gap-2 shadow-md border-b">
          <form onSubmit={handleSearch} className="flex-grow flex items-center">
            <input type="text" autoFocus placeholder="Search"value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"/>
            <button type="submit"
              className="bg-gray-100 px-4 py-2.5 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200">
              <FaSearch size={18} />
            </button>
          </form>
          <button onClick={() => setShowMobileSearch(false)} className="text-xl p-2 ml-2 hover:bg-gray-100 rounded-full">
            <FaTimes />
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
