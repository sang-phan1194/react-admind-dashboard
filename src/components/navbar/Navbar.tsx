import './navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/admin.png" alt="logo" />
        <span>Admin Board</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="/user.svg" alt="" />
          <span>Jame</span>
        </div>
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <img src="/search.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
