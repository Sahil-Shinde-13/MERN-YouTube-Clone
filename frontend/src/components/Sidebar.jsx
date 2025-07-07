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
    <aside className="w-60 bg-white shadow-md px-4 py-5 fixed top-[58px] bottom-0 left-0 z-10 overflow-y-auto text-sm">
      <ul className="space-y-3">
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><IoHomeSharp/><span>Home</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><SiYoutubeshorts/> <span>Shortz</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><MdSubscriptions/><span>Subscriptions</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><SiYoutubemusic/><span>Youtube Music</span></li>
      </ul>
      <hr className="my-4 border-gray-400"/>
      <p className="text-xs text-gray-500 mb-2 flex items-center">
        You <FaGreaterThan className="ml-1" />
      </p>
      <ul className="space-y-3">
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><FaHistory/><span>History</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><CgPlayListSearch/><span>Playlists</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><MdOutlineWatchLater/><span>Watch Later</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><AiFillLike/><span>Liked Videos</span></li>
        <li className="flex items-center gap-4 px-2 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"><RiDownloadLine/><span>Download</span></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
