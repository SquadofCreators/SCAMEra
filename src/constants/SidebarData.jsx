// Sidebar Data
import Logo from "../assets/logo.png";

import { MdOutlineAnalytics, MdOutlineSpaceDashboard, MdAnalytics } from "react-icons/md";
import { TbZoomScanFilled } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";

export const SIDEBAR_TITLE = "SCAM ERA";

export const SIDEBAR_LOGO = Logo;

export const SIDEBAR_LINKS = [
  {
    name: "Dashboard",
    link: "/",
    icon: MdOutlineSpaceDashboard,
  },
  {
    name: "Analyze",
    link: "/analyze",
    icon: TbZoomScanFilled,
  },
  {
    name: "Analytics",
    link: "/analytics",
    icon: MdOutlineAnalytics,
  },
  {
    name: "Trends",
    link: "/trends",
    icon: FaArrowTrendUp,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: IoMdSettings,
  },
];

// Exporting structured sidebar data
export default { SIDEBAR_LOGO, SIDEBAR_TITLE, SIDEBAR_LINKS };
