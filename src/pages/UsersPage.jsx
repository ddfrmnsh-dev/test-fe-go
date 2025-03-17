import { Button, Label, Modal, Select, TextInput, Toast } from "flowbite-react";
import { UserTableComponent } from "../components/user/UserTable";
import PageWrapper from "./PageWrapper";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { HiCheck } from "react-icons/hi";

const UsersPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isActive: true,
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const { createUser, fetchUsers, currentPage, limit } =
    useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isActive" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setLoading(true);
    try {
      const response = await createUser(formData);

      setToastMessage(response.message || "User added successfully!");
      setToastType("success");
      setShowToast(true);

      setLoading(true);

      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
        isActive: true,
      });

      await fetchUsers(currentPage, limit);

      setOpenModalAdd(false);
    } catch (error) {
      console.error("Error submitting form:", error);

      setToastMessage(error.response?.data?.message || "Failed to add user!");
      setToastType("error");

      setShowToast(true);
    } finally {
      setLoading(false);

      setTimeout(() => setShowToast(false), 3000);
    }
  };
  return (
    <PageWrapper>
      <div className="p-4">
        <div className="p-4 rounded-lg ">
          <div className="grid grid-cols-1 gap-4 mb-4 relative">
            <div className="flex justify-end">
              <Button
                className="text-white "
                gradientDuoTone="purpleToBlue"
                onClick={() => setOpenModalAdd(true)}
              >
                Add User
              </Button>
            </div>
          </div>
          <div className="items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
            <UserTableComponent />
          </div>
        </div>
      </div>

      <Modal show={openModalAdd} onClose={() => setOpenModalAdd(false)}>
        <Modal.Header>Add New User</Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username" value="Username" />
                <TextInput
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role" value="Role" />
                <TextInput
                  id="role"
                  name="role"
                  type="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter role"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <Label htmlFor="Status" value="Status" />
                <Select
                  id="isActive"
                  name="isActive"
                  value={formData.isActive.toString()}
                  onChange={handleChange}
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" color="blue">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {showToast && (
        <div className="fixed top-4 right-4">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                toastType === "success"
                  ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {toastType === "success" ? <HiCheck className="h-5 w-5" /> : "❌"}
            </div>
            <div className="ml-3 text-sm font-normal">{toastMessage}</div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-white"
            >
              ✕
            </button>
          </Toast>
        </div>
      )}
    </PageWrapper>
  );
};

export default UsersPage;
