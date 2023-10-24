import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../components/dataTable/DataTable';
import { useFirebaseQuery } from '../../queryFromFirebase';
import './products.scss';
import MyForm from '../../components/myForm/MyForm';

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

const Products = (props: any) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const { data, isLoading, isError } = useFirebaseQuery('product', 'products');

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
            <img src="./delete.svg" alt="" />
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
      {open && <MyForm open={open} setOpen={setOpen} id={id} />}
    </div>
  );
};

export default Products;
