import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSingleQuery } from '../../queryFromFirebase';
import { db } from '../../firebase';
import './myForm.scss';
import { useState } from 'react';

const MyForm = (props: any) => {
  const { setOpen, id, refetch } = props;
  const { data, isLoading } = useSingleQuery(id, 'products', id);
  const [attachedFile, setAttachedFile] = useState('');
  const handleFileChange = (e: any) => {
    if (e) {
      setAttachedFile(e?.target.files[0].name);
    }
  };

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
      const storage = getStorage();
      const storageRef = ref(storage, `${productName}`);

      uploadBytes(storageRef, photoFile).then(async () => {
        getDownloadURL(storageRef).then(async (photoUrl) => {
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
          refetch();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const productName = e.target[0].value;
    const brandName = e.target[1].value;
    const productCategory = e.target[2].value;
    const productDesc = e.target[3].value;
    const productPrice = e.target[4].value;

    try {
      const productRef = doc(db, 'products', id);
      const productDatas = {
        productName,
        brandName,
        productCategory,
        productDesc,
        productPrice
      };
      await updateDoc(productRef, productDatas);
      setOpen(false);
      refetch();
    } catch (error) {
      console.log(error);
    }
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
              <label htmlFor="">
                Product Name<span className="required">*</span>
              </label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">
                Brand Name<span className="required">*</span>
              </label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">
                Category<span className="required">*</span>
              </label>
              <input type="text" required />
            </div>
            <div className="item">
              <label htmlFor="">Description</label>
              <textarea rows={5} />
            </div>
            <div className="item">
              <label htmlFor="">
                Price<span className="required">*</span>
              </label>
              <input type="number" required />
            </div>
            <div className="item item-file">
              <span>
                Photo<span className="required">*</span>
              </span>
              <label htmlFor="file">
                <img src="/img.svg" alt="" />
                {attachedFile || 'Please choose an image'}
                <input
                  onChange={handleFileChange}
                  id="file"
                  type="file"
                  accept="image/*"
                  required
                />
              </label>
            </div>
            <button type="submit">Save</button>
          </form>
        ) : !isLoading ? (
          <form onSubmit={handleUpdate}>
            <div className="item">
              <label htmlFor="">
                Product Name<span className="required">*</span>
              </label>
              <input type="text" defaultValue={data.productName || ''} />
            </div>
            <div className="item">
              <label htmlFor="">
                Brand Name<span className="required">*</span>
              </label>
              <input type="text" defaultValue={data.brandName || ''} />
            </div>
            <div className="item">
              <label htmlFor="">
                Category<span className="required">*</span>
              </label>
              <input type="text" defaultValue={data.productCategory || ''} />
            </div>
            <div className="item">
              <label htmlFor="">Description</label>
              <textarea rows={5} defaultValue={data.productDesc || ''} />
            </div>
            <div className="item">
              <label htmlFor="">
                Price<span className="required">*</span>
              </label>
              <input type="number" defaultValue={data.productPrice || 0} />
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
