import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-semibold text-primary">
          Book Catalog
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/all-books">All Books</NavLink>
          </li>
          <li></li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link to="/sign-in" className="btn btn-sm mr-2 bg-transparent border-none normal-case">
          Sign In
        </Link>
        <Link to="/sign-up" className="btn btn-sm btn-outline normal-case">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
