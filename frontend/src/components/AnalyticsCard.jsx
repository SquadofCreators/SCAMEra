import React, { useState } from 'react';
import Notification from './Notification';
import { TiInfoLarge } from "react-icons/ti";

function AnalyticsCard({ data }) {
    const { title, image, detectionAccuracy, confidenceScore, mediaType } = data;

    const [showNotification, setShowNotification] = useState(false);
    const [notificationData, setNotificationData] = useState({});

    const handleClick = () => {
        setNotificationData({
            icon: TiInfoLarge,
            description: `Opened ${mediaType}: ${title}`,
            role: "success",
            mode: () => setShowNotification(false),
        });
        setShowNotification(true);
    };

    return (
        <>
            <div 
                onClick={handleClick}
                className="w-full max-w-sm bg-gray-800 rounded-lg shadow-md cursor-pointer"
            >
                {/* Thumbnail */}
                <div className="w-full bg-gray-800 rounded-t-lg">
                    <img
                        src={image} 
                        alt={title}
                        className="w-full aspect-video object-cover rounded-t-lg"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Title */}
                    <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>

                    {/* Detection Metrics */}
                    <div className="flex flex-col space-y-2">
                        {/* Detection Accuracy */}
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-500 font-bold">Accuracy:</span>
                            <span className="text-white">{detectionAccuracy}%</span>
                        </div>

                        {/* Confidence Score */}
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-500 font-bold">Confidence:</span>
                            <span className="text-white">{confidenceScore}%</span>
                        </div>

                        {/* Media Type */}
                        <div className="flex items-center space-x-2">
                            <span className="text-teal-500 font-bold">Media Type:</span>
                            <span className="text-white">{mediaType}</span>
                        </div>
                    </div>
                </div>
            </div>

            {showNotification && <Notification data={notificationData} />}
        </>
    );
}

export default AnalyticsCard;
