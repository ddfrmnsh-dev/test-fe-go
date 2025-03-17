import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { UserTableComponent } from "../components/user/UserTable";
import PageWrapper from "./PageWrapper";
import { useState } from "react";

const UsersPage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };
  return (
    <PageWrapper>
      {/* <div className="p-4">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Users Page
          </h1>
        </div>
      </div> */}
      <div className="p-4">
        <div className="p-4 rounded-lg ">
          <div className="grid grid-cols-1 gap-4 mb-4 relative">
            {/* Button Add User di kanan bawah */}
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
                <Label htmlFor="status" value="Status" />
                <Select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
    </PageWrapper>
  );
};

export default UsersPage;
