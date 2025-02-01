import React, { createElement } from "react";
import { IoClose } from "react-icons/io5";

function Notification({ data }) {
    const roleClasses = {
        default: "text-gray-500 text-2xl",
        success: "text-green-500 text-2xl",
        warning: "text-yellow-500 text-2xl",
        danger: "text-red-500 text-2xl",
    };

    // Notification Auto Hide
    setTimeout(() => {
        mode();
    }, 5000);


    const { icon, description, role="default", mode } = data;

  return (
    <div className="max-w-2xl mx-auto fixed bottom-6 md:bottom-4 right-10 left-10 md:-right-full md:left-0 z-50">
        <div
            className={`flex items-center justify-between gap-2 w-full max-w-xs p-4 rounded-lg shadow bg-gray-800`}
        >
            {/* Icon */}
            <p className={`"text-xl" ${roleClasses[role]}`}>{createElement(icon)}</p>

            {/* Description */}
            <div className="text-sm font-normal">{description}</div>

            {/* Close Button */}
            <button
                type="button"
                className="bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={mode}
            >
                <span className="sr-only">Close</span>
                <IoClose />
            </button>
        </div>
    </div>
  );
}

export default Notification;


// Note: 
// This is a simple notification component that displays a message with an icon and a close button. 
// The component accepts the following props:

// icon: Icon component to display in the notification
// description: Message to display in the notification
// role: Role of the notification (default, success, warning, danger)
// mode: Function to close the notification

// The notification will automatically hide after 5 seconds using setTimeout.
// The notification is styled with Tailwind CSS classes.
// The close button allows users to dismiss the notification.

// Usage:
// The Notification component can be used in other components to display notifications.

// Example usage in Topbar.jsx:
// import { TiWarning } from "react-icons/ti";
// import Notification from "./Notification";

// State to manage notification visibility
// const [showNotification, setShowNotification] = useState(false);
// const [notificationData, setNotificationData] = useState({});

// Handle login action
// const handleLogin = () => {
//   setShowNotification(true);
//   const data = {
//     icon: TiWarning,
//     description: "Successfully logged in",
//     role: "success",
//     mode: () => setShowNotification(false),
//   };
//   setNotificationData(data);
// };

// Handle logout action
// const handleLogout = () => {
//   setShowNotification(true);
//   const data = {
//     icon: TiWarning,
//     description: "Successfully logged out",
//     role: "warning",
//     mode: () => setShowNotification(false),
//   };
//   setNotificationData(data);
// };

// Render the notification component
// {showNotification && <Notification data={notificationData} />}

// In this example, the Notification component is conditionally rendered based on the showNotification state.
// The data prop is passed to the Notification component to configure the notification message and behavior.
