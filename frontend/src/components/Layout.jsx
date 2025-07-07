import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-grow p-4 ${isSidebarOpen ? 'ml-60' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
