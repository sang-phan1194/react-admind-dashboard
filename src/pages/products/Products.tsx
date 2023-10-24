import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { doc, deleteDoc } from 'firebase/firestore';

import DataTable from '../../components/dataTable/DataTable';
import MyForm from '../../components/myForm/MyForm';

import { useFirebaseQuery } from '../../queryFromFirebase';
import { db } from '../../firebase';
import './products.scss';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.productPhoto || '/noavatar.png'} alt="" />;
    }
  },
  {
    field: 'productName',
    type: 'string',
    headerName: 'Product Name',
    width: 300
  },
  {
    field: 'productCategory',
    type: 'string',
    headerName: 'Category',
    width: 120
  },
  {
    field: 'productPrice',
    type: 'string',
    headerName: 'Price',
    width: 140,
    renderCell: (params) => {
      return (
        <span>{`${new Intl.NumberFormat().format(
          params.row.productPrice
        )} VND`}</span>
      );
    }
  },
  {
    field: 'brandName',
    headerName: 'Brand',
    type: 'string',
    width: 170
  }
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const { data, isLoading, refetch } = useFirebaseQuery('product', 'products');

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  const columnActions: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => {
      return (
        <div className="actions">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setId(params.row.id);
              setOpen(true);
            }}
          >
            <img src="./view.svg" alt="" />
          </span>

          <div className="delete">
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(params.row.id);
                refetch();
              }}
            >
              <img src="./delete.svg" alt="" />
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button
          onClick={() => {
            setOpen(true);
            setId('');
          }}
        >
          Add New Product
        </button>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <DataTable
          slug="products"
          columns={[...columns, columnActions]}
          rows={data}
        />
      )}
      {open && (
        <MyForm open={open} setOpen={setOpen} id={id} refetch={refetch} />
      )}
    </div>
  );
};

export default Products;
