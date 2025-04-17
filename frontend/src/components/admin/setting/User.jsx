import React, { useEffect, useState } from "react";

function UserDetail() {
    const [user, setUser] = useState(null);

    const fetchUserDetail = async () => {
        try {
            const res = await fetch("https://appjob-o3ho.onrender.com/api/login", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.log("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    return (
        <div className="  flex items-center justify-center p-4 mt-10">
            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8 transform transition-all hover:scale-[1.01]">
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                        {
                            user?.username ? `${user.username.charAt(0).toUpperCase()}${user.username.charAt(1).toUpperCase()}` : "Employer"
                        }
                    </div>
                    <h2 className="text-sm sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">{user?.username || "Loading..."}</h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-4">{user?.email || "Fetching email..."}</p>

                    <div className="w-full mt-4 space-y-2">
                        <div className="flex justify-between text-sm sm:text-base md:text-lg  text-gray-700">
                            <span className="font-semibold">Organization:</span>
                            <span>{user?.organization || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base md:text-lg  text-gray-700">
                            <span className="font-semibold">Account Type:</span>
                            <span>{user?.isAdmin ? "Admin" : "Employer"}</span>
                        </div>
                    </div>

                    {/* <button className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-full shadow-md transition-all">
            Edit Profile
          </button> */}
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
