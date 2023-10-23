import { useParams } from 'react-router-dom';
import SinglePage from '../../components/singlePage/SinglePage';
import { singleProduct } from '../../data';
import './singleProduct.scss';

const SingleProduct = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="singleProduct">
      <SinglePage {...singleProduct} />
    </div>
  );
};

export default SingleProduct;
