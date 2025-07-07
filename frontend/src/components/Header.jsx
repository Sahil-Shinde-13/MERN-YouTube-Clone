import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";

function Header({ toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  function handleSearch(e){
    e.preventDefault();
  }

  return (
    <header className="bg-white shadow-sm px-4 py-2 flex justify-between items-center sticky top-0 z-20 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-xl p-1 hover:bg-gray-100 cursor-pointer rounded-full"><GiHamburgerMenu/></button>
        <div onClick={() => navigate("/home")} className="text-xl font-bold cursor-pointer flex items-center text-red-600">
        <FaYoutube className="mr-1" size={24}/> <span className="hidden sm:inline">YouTube Clone</span> 
        </div>
      </div>

      <form onSubmit={handleSearch} className="flex flex-grow items-center max-w-2xl mx-4">
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400"/>
        
        <button type="submit"
          className="bg-gray-100 px-4 py-2.5 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200 flex items-center justify-center">
          <FaSearch size={18}/>
        </button>
      </form>
      <div className="flex items-center gap-2 text-gray-700 text-sm font-medium" >
        {user?.username}<FaRegUserCircle className="text-xl" />
      </div>
    </header>
  );
}

export default Header;
