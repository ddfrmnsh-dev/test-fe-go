import Sidebars from "../components/common/Sidebar";

const PageWrapper = ({ children }) => {
  return (
    <>
      <div className="flex">
        {/* Sidebar tetap di kiri */}
        <div className="fixed left-0 top-0 h-full w-64">
          <Sidebars />
        </div>

        {/* Konten utama diberi margin agar tidak tertutup Sidebar */}
        <div className="ml-64 w-full p-5 bg-white dark:bg-gray-900">
          {children}
        </div>
      </div>
      {/* <div className="bg-gray-900 text-gray-100 overflow-hidden">
        <div className="mx-auto w-full bg-white bg-gradient-to-r dark:bg-gray-900 p-5">
          <Sidebars />
          {children}
        </div>
      </div> */}
    </>
  );
};

export default PageWrapper;
