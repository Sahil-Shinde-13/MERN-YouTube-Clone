import { SiYoutubeshorts } from "react-icons/si";
import { IoHomeSharp } from "react-icons/io5";
import { SiYoutubemusic } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { FaGreaterThan } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { CgPlayListSearch } from "react-icons/cg";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { RiDownloadLine } from "react-icons/ri";

function Sidebar({ isOpen }) {
  if (!isOpen) return null;

  return (
    <aside className="w-60 bg-white shadow-md p-4 fixed top-[58px] bottom-0 left-0 z-10">
      <ul className="space-y-3 text-sm">
        <li className="hover:font-medium cursor-pointer"><IoHomeSharp/>Home</li>
        <li className="hover:font-medium cursor-pointer"><SiYoutubeshorts/>Shortz</li>
        <li className="hover:font-medium cursor-pointer"><MdSubscriptions/>Subscriptions</li>
        <li className="hover:font-medium cursor-pointer"><SiYoutubemusic/>Youtube Music</li>
      </ul>
      <hr />
      <ul>
        <li className="hover:font-medium cursor-pointer">you <FaGreaterThan/></li>
        <li className="hover:font-medium cursor-pointer"><FaHistory/>History</li>
        <li className="hover:font-medium cursor-pointer"><CgPlayListSearch/>Playlists</li>
        <li className="hover:font-medium cursor-pointer"><MdOutlineWatchLater/>Watch Later</li>
        <li className="hover:font-medium cursor-pointer"><AiFillLike/>Liked Videos</li>
        <li className="hover:font-medium cursor-pointer"><RiDownloadLine/>Downloads</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
