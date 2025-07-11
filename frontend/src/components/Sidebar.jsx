import {SiYoutubeshorts,SiYoutubemusic,} from "react-icons/si";
import { IoHomeSharp } from "react-icons/io5";
import {MdSubscriptions,MdOutlineWatchLater,MdLocalMovies,} from "react-icons/md";
import {FaGreaterThan,FaShoppingBag,FaHistory} from "react-icons/fa";
import { CgPlayListSearch } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";
import { RiDownloadLine } from "react-icons/ri";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { FaMusic } from "react-icons/fa6";
import { TbLivePhoto } from "react-icons/tb";
import { Link } from "react-router-dom";

// Renders the sidebar
function Sidebar({ isOpen }) {
  if (!isOpen) return null;// hide if sidebar is closed

  // Sidebar menu item component
  const Item = ({ icon: Icon, label }) => (
    <li className="flex sm:flex-row flex-col sm:items-center items-center gap-1 sm:gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer">
      <Icon size={20} />
      <span className="text-[10px] sm:text-sm text-center">{label}</span>
    </li>
  );

  return (
    <aside className="w-16 sm:w-60 bg-white shadow-md px-1 sm:px-4 py-5 fixed top-[58px] bottom-0 left-0 z-10 overflow-y-auto text-sm">
      <ul className="space-y-3">
        <Link to="/"><Item icon={IoHomeSharp} label="Home"/></Link>
        <Item icon={SiYoutubeshorts} label="Shortz" />
        <Item icon={MdSubscriptions} label="Subscriptions" />
        <Item icon={SiYoutubemusic} label="Youtube Music" />
      </ul>

      <hr className="my-4 border-gray-400" />
      
      {/* You Section */}
      <p className="text-xs text-gray-500 mb-2 flex items-center justify-center sm:justify-start">
        You <FaGreaterThan className="ml-1" />
      </p>
      <ul className="space-y-3">
        <Item icon={FaHistory} label="History" />
        <Item icon={CgPlayListSearch} label="Playlists" />
        <Item icon={MdOutlineWatchLater} label="Watch Later" />
        <Item icon={AiFillLike} label="Liked Videos" />
        <Item icon={RiDownloadLine} label="Download" />
      </ul>

      <hr className="my-4 border-gray-400" />

      {/* Explore Section */}
      <p className="text-xs text-gray-500 mb-2 flex items-center justify-center sm:justify-start">
        Explore <FaGreaterThan className="ml-1" />
      </p>
      <ul className="space-y-3">
        <Item icon={HiOutlineTrendingUp} label="Trending" />
        <Item icon={FaShoppingBag} label="Shopping" />
        <Item icon={FaMusic} label="Music" />
        <Item icon={MdLocalMovies} label="Movies" />
        <Item icon={TbLivePhoto} label="Live" />
      </ul>
    </aside>
  );
}

export default Sidebar;
