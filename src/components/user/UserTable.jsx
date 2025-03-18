import {
  Button,
  Label,
  Modal,
  Pagination,
  Select,
  Table,
  TextInput,
  Toast,
} from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export function UserTableComponent() {
  const onPageChange = (page) => setCurrentPage(page);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    isActive: true,
  });

  const {
    users,
    findUserById,
    fetchUsers,
    currentPage,
    limit,
    setCurrentPage,
    totalUser,
    setTotalUser,
    selectedUser,
    deleteUser,
    updateUser,
  } = useContext(UserContext);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setLoading(true);
    try {
      await deleteUser(userToDelete);

      setToastMessage("User deleted successfully! ❌");
      setToastType("success");

      const newTotals = totalUser - 1;
      setTotalUser(newTotals);

      const maxPage = Math.ceil(newTotals / limit);

      console.log("maxPage", maxPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage);
      } else if (newTotals < limit && currentPage > 1) {
        setCurrentPage(1);
      }

      fetchUsers(currentPage, limit);
    } catch (error) {
      console.error("Error deleting user:", error);
      setToastMessage("Failed to delete user!");
      setToastType("error");
    } finally {
      setLoading(false);
      setOpenModalDelete(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const showModalEdit = async (userId) => {
    setOpenModalEdit(true);
    setSelectedUserId(userId);

    await findUserById(userId);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(selectedUserId, formData);

      setToastMessage("User updated successfully!");
      setToastType("success");

      setLoading(false);

      await fetchUsers(currentPage, limit);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      setToastMessage("Failed to update user!");
      setToastType("error");
    } finally {
      setLoading(false);
      setOpenModalEdit(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        username: selectedUser.username,
        email: selectedUser.email,
        role: selectedUser.role,
        isActive: selectedUser.isActive,
      });
    }
  }, [selectedUser]);
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <Table hoverable className="w-full">
        <Table.Head>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Status Active</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-900 dark:text-white">
                {user.email}
              </Table.Cell>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>
                {user.isActive == true ? "Active" : "Inactive"}
              </Table.Cell>
              <Table.Cell className="flex space-x-4">
                <button
                  onClick={() => {
                    showModalEdit(user.id);
                  }}
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setUserToDelete(user.id);
                    setOpenModalDelete(true);
                  }}
                  className="text-red-600 hover:underline dark:text-red-500"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalUser / limit)}
          onPageChange={onPageChange}
        />
      </div>

      {/* Modal Delete */}
      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={handleDeleteUser}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal Edit */}
      <Modal show={openModalEdit} onClose={() => setOpenModalEdit(false)}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditUser} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username" value="Username" />
                <TextInput
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role" value="Role" />
                <TextInput
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="Enter role"
                  required
                />
              </div>

              <div>
                <Label htmlFor="Status" value="Status" />
                <Select
                  id="isActive"
                  name="isActive"
                  value={formData.isActive.toString()}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.value === "true",
                    })
                  }
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" color="blue" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {showToast && (
        <div className="fixed top-4 right-4">
          <Toast>{toastMessage}</Toast>
        </div>
      )}
    </div>
  );
}
