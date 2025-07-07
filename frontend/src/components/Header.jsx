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

  function handleSearch(){

  }
  return (
    <header className="bg-white shadow px-4 py-2 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-xl"><GiHamburgerMenu/></button>
        <h1 onClick={() => navigate("/home")} className="text-xl font-bold cursor-pointer flex items-center text-red-600">
        <FaYoutube/> <span>YouTube Clone</span> 
        </h1>
      </div>
      <form onSubmit={handleSearch} className="flex flex-grow max-w-xl mx-4">
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"/>
        
        <button type="submit"
          className="bg-gray-200 px-4 rounded-r hover:bg-gray-300">
          <FaSearch/>
        </button>
      </form>
      <div>
        <span className="text-sm font-medium">{user?.username}<FaRegUserCircle/></span>
      </div>
    </header>
  );
}

export default Header;
