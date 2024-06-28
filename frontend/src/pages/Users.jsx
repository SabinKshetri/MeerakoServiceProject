import React, { useState, useEffect } from "react";
import { useAuth } from "../ContextAPI/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getToken();
        console.log("Token:", token);

        const response = await axios.get(
          "http://localhost:8080/api/auth/profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [getToken]);

  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id);
    try {
      const token = await getToken();
      const response = await axios.delete(
        `http://localhost:8080/api/auth/profile/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);

      alert("User Deleted !!");
      setUserData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">
            User Information
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {userData ? (
            userData.map((user) => (
              <div key={user.id} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    alt="team"
                    className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
                    src="https://dummyimage.com/200x200"
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      {user.fullName}
                    </h2>
                    <h3 className="text-gray-500 mb-3">{user.email}</h3>

                    <span className="inline-flex">
                      <Link to={`/updateUser/${user.id}`}>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;
