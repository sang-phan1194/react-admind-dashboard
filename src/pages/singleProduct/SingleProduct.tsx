import SinglePage from '../../components/singlePage/SinglePage';
import { singleProduct } from '../../data';
import './singleProduct.scss';

const SingleProduct = () => {
  return (
    <div className="singleProduct">
      <SinglePage {...singleProduct} />
    </div>
  );
};

export default SingleProduct;
