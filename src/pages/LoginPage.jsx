import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { Button, Table } from "flowbite-react";

const LoginPage = () => {
  const baseUrl = "http://localhost:8888";
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isAuthenticated, setIsLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Form Data:", formData);
    try {
      const response = await axios.post(`${baseUrl}/api/signinAuth`, formData);

      console.log("API Response:", response.data);
      if (response.status === 200) {
        const { userPrincipal, token } = response.data.data;

        login(userPrincipal, token);
        navigate("/users");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuth", isAuthenticated);
      navigate("/users");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <form
        className="max-w-sm w-full bg-gray-800 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="admin@admin.com"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
