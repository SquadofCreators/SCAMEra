import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dummy user details (replace with API or context)
  const [profile, setProfile] = useState({
    name: "Praveen Siva",
    email: "praveensiva0820@gmail.com",
    role: "Admin",
    imageUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/Praveen%20Siva/128",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "Praveen Siva",
        email: user.email || "praveensiva0820@gmail.com",
        role: user.role || "Admin",
        imageUrl: user.imageUrl || "https://via.placeholder.com/150",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditMode(false);
    console.log("Profile Updated:", profile);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>

      <div className="flex flex-col gap-4">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={profile.imageUrl}
            alt="Profile"
            className="w-32 h-32 object-center rounded-full"
          />
        </div>

        {editMode && (
          <div>
            <label className="block text-sm">Profile Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={profile.imageUrl}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
            />
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm">Name</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
            />
          ) : (
            <p className="bg-gray-700 p-2 rounded">{profile.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm">Email</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
            />
          ) : (
            <p className="bg-gray-700 p-2 rounded">{profile.email}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm">Role</label>
          {editMode ? (
            <select
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          ) : (
            <p className="bg-gray-700 p-2 rounded">{profile.role}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          {editMode ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
