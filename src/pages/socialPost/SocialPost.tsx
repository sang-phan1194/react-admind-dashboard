import './socialPost.scss';

const SocialPost = () => {
  return (
    <div className="socialPost">
      <div className="toolBar">
        <div className="filterPost">
          <input type="text" placeholder="Search here" />
          <button>Filter</button>
        </div>
        <button>Create A Post</button>
      </div>
      <div className="posts">Posts</div>
    </div>
  );
};

export default SocialPost;
