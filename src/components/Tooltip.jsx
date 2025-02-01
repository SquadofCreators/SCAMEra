import React, { useState } from "react";

function Tooltip({ children, content, position = "bottom" }) {
  const [isVisible, setIsVisible] = useState(false);

  // Auto Hide Tooltip after 5 seconds on mouse leave
  setTimeout(() => {
    setIsVisible(false);
  }, 5000);
  

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block" 
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      
      {isVisible && (
        <div className={`absolute ${positionClasses[position]} bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md whitespace-nowrap`}>
          {content}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
