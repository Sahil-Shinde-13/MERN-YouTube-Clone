import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col w-screen">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-grow p-4 ${isSidebarOpen ? 'sm:ml-60 ml-20' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
