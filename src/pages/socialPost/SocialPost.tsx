import { useFirebaseQuery } from '../../queryFromFirebase';
import './socialPost.scss';

const SocialPost = () => {
  const { data, isLoading, refetch } = useFirebaseQuery('posts', 'posts');

  console.log(data);
  return (
    <div className="socialPost">
      <button>Create A Post</button>

      <div className="posts">
        {!isLoading &&
          data.map((item: any) => (
            <div className="postWrapper" key={item.id}>
              <img src={item.postPhoto} alt="" />
              <div className="content">
                <h2 className="title">{item.title}</h2>
                <p className="desc">{item.desc}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SocialPost;
