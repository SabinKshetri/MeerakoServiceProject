import axios from "axios";

const token = sessionStorage.getItem("token");
if (!token) {
  alert("Please Login !!");
}

const Authenticated_API = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
  },
});

export { Authenticated_API };
