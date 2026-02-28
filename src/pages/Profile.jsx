import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [stats] = useState({
    memesCreated: 12,
    likes: 45,
    followers: 23
  });

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-16 left-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Edit Button */}
          <div className="absolute top-4 right-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition"
              >
                <Edit2 size={18} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full transition"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full transition"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="pt-16">
            {isEditing ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                />
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
            )}

            <div className="space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Joined March 2024</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.memesCreated}</div>
                <div className="text-sm text-gray-500">Memes Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.likes}</div>
                <div className="text-sm text-gray-500">Total Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.followers}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-center py-8">
            No recent activity to display
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;