import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable';
import { userRows } from '../../data';
import './users.scss';
import { useState } from 'react';
import AddNewUser from '../../components/addNewUser/AddNewUser';
import { useQuery } from 'react-query';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 90,
    renderCell: (params) => {
      return <img src={params.row.img || '/noavatar.png'} alt="" />;
    }
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    width: 100
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
    width: 100
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    width: 150
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
    type: 'string'
  },
  {
    field: 'verified',
    headerName: 'Verified',
    width: 100,
    type: 'boolean'
  }
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
      (res) => res.json()
    )
  );
  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <DataTable slug="users" columns={columns} rows={userRows} />
      )}
      {open && <AddNewUser slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
