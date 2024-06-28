import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Authenticated_API } from "../../httpServices/ApiServices";
import { toast } from "react-toastify";

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllBooks = async () => {
    const response = await axios.get("http://localhost:8080/books");
    if (response.status == 200) {
      setData(response.data.data);
      setErrorMessage(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete book with id:", id);
    try {
      const response = await Authenticated_API.delete(`/books/${id}`);
      if (response.status == 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong !!");
    }
  };

  return (
    <>
      <Link to="/addbooks">
        <button className="mt-20 flex  items-center bg-blue-950 p-3 rounded-sm mx-2 text-white">
          + ADD BOOK
        </button>
      </Link>

      <div className="flex justify-center items-center mt-20 w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Genre</th>
                <th className="py-2 px-4 border-b">Year of Publication</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((book) => (
                <tr key={book.id}>
                  <td className="py-2 px-4 border-b">{book.title}</td>
                  <td className="py-2 px-4 border-b">{book.author}</td>
                  <td className="py-2 px-4 border-b">{book.genre}</td>
                  <td className="py-2 px-4 border-b">{book.year}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`/editbook/${book.id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
