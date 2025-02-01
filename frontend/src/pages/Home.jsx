import React from "react";
import StatCard from "../components/StatCard";

import { FaKeycdn } from "react-icons/fa";
import { LuFolderCheck } from "react-icons/lu";
import { TbUserScan } from "react-icons/tb";
import { LuFolderClock } from "react-icons/lu";
import { TbAlertTriangle } from "react-icons/tb";
import { RiFolderChartLine } from "react-icons/ri";

function Home() {
  // Mock data for statistics
  const stats = [
    { 

      icon: <FaKeycdn />,
      title: "Detected DeepFakes", 
      value: "1600", 
      link: "/analytics"
    },
    {
      icon: <TbUserScan />,
      title: "Total Users",
      value: "10000",
      link: "/analytics"
    },
    {
      icon: <LuFolderCheck />,
      title: "Analyzed Media Files",
      value: "3200",
      link: "/analyze"
    },
    {
      icon: <RiFolderChartLine />,
      title: "Detection Accuracy",
      value: "98.5%",
      link: "/analytics"
    },
    {
      icon: <LuFolderClock />,
      title: "Pending Files for Analysis",
      value: "25",
      link: "/analyze"
    },
    {
      icon: <TbAlertTriangle />,
      title: "False Positives",
      value: "3",
      link: "/analytics"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-8 p-2">
      {/* First Row: Two Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stats.slice(0, 2).map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} link={stat.link} />
        ))}
      </div>

      {/* Second Row Onwards: Remaining Cards in Separate Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {stats.slice(2).map((stat, index) => (
          <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} link={stat.link} />
        ))}
      </div>
    </div>
  );
}

export default Home;
