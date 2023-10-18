import SinglePage from '../../components/singlePage/SinglePage';
import { singleUser } from '../../data';
import './singleUser.scss';

const SingleUser = () => {
  return (
    <div className="singleUser">
      <SinglePage {...singleUser} />
    </div>
  );
};

export default SingleUser;
