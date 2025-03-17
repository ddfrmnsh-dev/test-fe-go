import { Button, Modal, Pagination, Table } from "flowbite-react";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export function UserTableComponent() {
  //   const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  // Dummy Data (nanti bisa diganti dengan API atau state)
  //   const users = [
  //     {
  //       email: "john@example.com",
  //       username: "john_doe",
  //       role: "Admin",
  //       price: "$2999",
  //     },
  //     {
  //       email: "jane@example.com",
  //       username: "jane_doe",
  //       role: "Editor",
  //       price: "$1999",
  //     },
  //     {
  //       email: "mike@example.com",
  //       username: "mike_smith",
  //       role: "Viewer",
  //       price: "$99",
  //     },
  //   ];

  const {
    users,
    findUserById,
    fetchUsers,
    currentPage,
    limit,
    setCurrentPage,
    setLimit,
    totalUser,
    setTotalUser,
    selectedUser,
    deleteUser,
  } = useContext(UserContext);

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
                <a
                  href="#"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
                <button
                  onClick={() => setOpenModalDelete(true)}
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
          totalPages={10}
          onPageChange={onPageChange}
        />
      </div>

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
              <Button color="failure" onClick={() => setOpenModalDelete(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
