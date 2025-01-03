import React from 'react';
import { Table } from 'react-daisyui';
import NavtableAdmin from './NavtableAdmin';

interface TableListAdminProps {
  table_head: React.ReactNode;
  table_body: React.ReactNode;
  Title_TableListAdmin: string;
  className?: React.ReactNode;
}
const TableListAdmin: React.FC<TableListAdminProps> = ({
  className,
  table_head,
  table_body,
  Title_TableListAdmin
}) => {
  return (
    <div>
      <div className="w-full bg-white dark:bg-primary dark:bg-opacity-50 md:rounded-md">
        {/* Navbar Admin */}
        <NavtableAdmin Title_NavtableAdmin={Title_TableListAdmin} />
        <div
          className={`w-screen overflow-x-auto border-8 border-transparent scrollbar-hide xl:w-full ${className}`}
        >
          {/* Phần Bảng */}
          <Table className="w-full text-black dark:text-white" zebra>
            {table_head}
            {table_body}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableListAdmin;
