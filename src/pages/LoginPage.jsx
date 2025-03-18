import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { Alert, Button, Card, Label, Table, TextInput } from "flowbite-react";

const customTheme = {
  root: {
    base: "flex w-full max-w-sm p-2 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800",
    children: "flex h-full flex-col justify-center gap-4 p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:bg-gray-100 dark:hover:bg-gray-700",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};
const LoginPage = () => {
  const baseUrl = "http://localhost:8888";
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isAuthenticated, setIsLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

        setSuccess(response.data.message);

        setTimeout(() => {
          login(userPrincipal, token);
          navigate("/users");
        }, 1000);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log("isAuth", isAuthenticated);
      navigate("/users");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="bg-white flex h-screen items-center justify-center">
      <Card className="max-w-md" theme={customTheme}>
        {error && ( // Tampilkan Alert jika error tidak kosong
          <Alert color="failure" onDismiss={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="success" onDismiss={() => setSuccess("")}>
            {success}
          </Alert>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              name="email"
              placeholder="admin@admin.com"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
