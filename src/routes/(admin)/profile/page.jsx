import React, { useState, useEffect } from 'react';
import { getUserById } from '../../../services/usersApi';
import { useAuth } from '../../../contexts/auth-context';
import {
    Linkedin,
    Youtube,
    Facebook,
    Instagram,
    Twitter
} from 'lucide-react';
import { useParams } from "react-router-dom";

const UserProfile = () => {

    const { userId } = useParams();
    const { user: currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                if (userId) {
                    const response = await getUserById(userId);
                    setProfileUser(response.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const user = userId ? profileUser : currentUser;

    if (loading && userId) return <div>Loading profile...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!user) return <div>User not found</div>;

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`}
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                    alt={`${user.first_name} ${user.last_name}`}
                                />
                                <h1 className="text-xl font-bold">{user.first_name} {user.last_name}</h1>
                                <p className="text-gray-700 capitalize">{user.role || 'User'}</p>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                        Contact
                                    </a>
                                    <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                                        View Details
                                    </a>
                                </div>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Details</span>
                                <ul>
                                    <li className="mb-2">
                                        <span className="font-semibold">Email:</span> {user.email}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-semibold">Role:</span> {user.role || 'Not specified'}
                                    </li>
                                    <li className="mb-2">
                                        <span className="font-semibold">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About</h2>
                            <p className="text-gray-700">
                                {user.bio || `${user.first_name} ${user.last_name} is a ${user.role || 'user'} in our system.`}
                            </p>

                            <h3 className="font-semibold text-center mt-3 -mb-2">
                                Connect
                            </h3>
                            <div className="flex justify-center items-center gap-6 my-6">
                                <a className="text-gray-700 hover:text-blue-600" aria-label="LinkedIn" href="#" target="_blank">
                                    <Linkedin size={24} />
                                </a>
                                <a className="text-gray-700 hover:text-red-600" aria-label="YouTube" href="#" target="_blank">
                                    <Youtube size={24} />
                                </a>
                                <a className="text-gray-700 hover:text-blue-800" aria-label="Facebook" href="#" target="_blank">
                                    <Facebook size={24} />
                                </a>
                                <a className="text-gray-700 hover:text-pink-600" aria-label="Instagram" href="#" target="_blank">
                                    <Instagram size={24} />
                                </a>
                                <a className="text-gray-700 hover:text-blue-400" aria-label="Twitter" href="#" target="_blank">
                                    <Twitter size={24} />
                                </a>
                            </div>

                            <h2 className="text-xl font-bold mt-6 mb-4">Activity</h2>
                            <div className="mb-6">
                                <div className="flex justify-between flex-wrap gap-2 w-full">
                                    <span className="text-gray-700 font-bold">Account Created</span>
                                    <p>
                                        <span className="text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </p>
                                </div>
                                <p className="mt-2">
                                    {user.first_name} joined our platform on {new Date(user.createdAt).toLocaleDateString()}.
                                </p>
                            </div>

                            {user.role === 'Company Admin' && (
                                <div className="mb-6">
                                    <div className="flex justify-between flex-wrap gap-2 w-full">
                                        <span className="text-gray-700 font-bold">Company Admin</span>
                                        <p>
                                            <span className="text-gray-700">Manages company profile</span>
                                        </p>
                                    </div>
                                    <p className="mt-2">
                                        As a company administrator, {user.first_name} has access to company management features.
                                    </p>
                                </div>
                            )}

                            {user.role === 'Government Admin' && (
                                <div className="mb-6">
                                    <div className="flex justify-between flex-wrap gap-2 w-full">
                                        <span className="text-gray-700 font-bold">Government Admin</span>
                                        <p>
                                            <span className="text-gray-700">System oversight</span>
                                        </p>
                                    </div>
                                    <p className="mt-2">
                                        {user.first_name} has administrative privileges across the entire platform.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;