import { useSingleQuery } from '../../queryFromFirebase';
import './myForm.scss';
import { uploadImage } from '../../uploadFile';
import { db } from '../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const MyForm = (props: any) => {
  const { setOpen, id } = props;
  const { data, isLoading } = useSingleQuery(id, 'products', id);

  // Add new product
  const handleAddNew = async (e: any) => {
    e.preventDefault();

    const productName = e.target[0].value;
    const brandName = e.target[1].value;
    const productCategory = e.target[2].value;
    const productDesc = e.target[3].value;
    const productPrice = e.target[4].value;
    const photoFile = e.target[5].files[0];

    try {
      const photoUrl = await uploadImage(photoFile);
      const productDatas = {
        productName,
        brandName,
        productCategory,
        productDesc,
        productPrice,
        productPhoto: photoUrl
      };

      const productRef = doc(collection(db, 'products'));

      await setDoc(productRef, productDatas);

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e: any) => {
    e.preventDefault();
    console.log(e.target);
    const productName = e.target[0].value;
    const brandName = e.target[1].value;
    const caterogy = e.target[2].value;
    const description = e.target[3].value;
    const price = e.target[4].value;
  };

  return (
    <div className="myForm">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        {id === '' ? (
          <form onSubmit={handleAddNew}>
            <div className="item">
              <label htmlFor="">Product Name</label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">Brand Name</label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">Category</label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">Description</label>
              <textarea rows={5} />
            </div>
            <div className="item">
              <label htmlFor="">Price</label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">Photo</label>
              <input type="file" required />
            </div>
            <button type="submit">Save</button>
          </form>
        ) : !isLoading ? (
          <form onSubmit={handleUpdate}>
            <div className="item">
              <label htmlFor="">Product Name</label>
              <input type="text" defaultValue={data.productName || ''} />
            </div>
            <div className="item">
              <label htmlFor="">Brand Name</label>
              <input type="text" defaultValue={data.brandName || ''} />
            </div>
            <div className="item">
              <label htmlFor="">Category</label>
              <input type="text" defaultValue={data.productCategory || ''} />
            </div>
            <div className="item">
              <label htmlFor="">Description</label>
              <textarea rows={5} defaultValue={data.productDesc || ''} />
            </div>
            <div className="item">
              <label htmlFor="">Price</label>
              <input type="text" defaultValue={data.productPrice || 0} />
            </div>
            <div className="item">
              <label htmlFor="">Photo</label>
              <img src={data.productPhoto || ''} alt="" />
            </div>
            <button type="submit">Save</button>
          </form>
        ) : (
          'Loading...'
        )}
      </div>
    </div>
  );
};

export default MyForm;
