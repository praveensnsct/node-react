import React from 'react';
import DataGrid from 'react-data-grid';
import './index.scss';

const UserTable = ({ columns, data }) => {
  return (
    <div className='userList'>
      <p>List of Users:</p>
      <DataGrid columns={columns} rows={data} />
    </div>
  )
}

export default UserTable;