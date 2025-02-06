import React from "react";
import { Avatar } from "@/components/ui/avatar";
import SidebarMenu from "./SidebarMenu";
import "./SidebarMenu.css"; // Use Sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar className="sidebar-profile-image" />
        <h2 className="text-lg font-bold">First Last</h2>
        <p className="text-sm text-gray-600">Sample Company Name</p>
      </div>
      <SidebarMenu />
    </div>
  );
};s

export default Sidebar;
