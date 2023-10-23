import { useState } from 'react';
import AddNewUser from '../../components/addNewUser/AddNewUser';
import DataTable from '../../components/dataTable/DataTable';
import './products.scss';
import { products } from '../../data';
import { useFirebaseQuery } from '../../queryFromFirebase';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
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
    width: 250
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
    width: 100
  },
  {
    field: 'brandName',
    headerName: 'Brand',
    type: 'string',
    width: 120
  }
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useFirebaseQuery('product', 'products');
  console.log(data);

  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}
      {open && (
        <AddNewUser slug="product" columns={columns} setOpen={setOpen} />
      )}
    </div>
  );
};

export default Products;
