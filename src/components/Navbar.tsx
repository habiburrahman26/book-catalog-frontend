import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const isLoggedIn = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ! sign out
  const signOut = () => {
    localStorage.clear();
    dispatch(userLoggedOut());
    navigate("/");
    // window.location.href = '/';
  };

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-semibold text-primary">
          Book Catalog
        </Link>
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/all-books">All Books</NavLink>
          </li>
          <li></li>
          {isLoggedIn && (
            <li>
              <NavLink to="/add-book">Add New Book</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/wishlist">Wish List</NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {!isLoggedIn && (
          <>
            <Link
              to="/sign-in"
              className="btn btn-sm mr-2 bg-transparent border-none normal-case"
            >
              Sign In
            </Link>
            <Link to="/sign-up" className="btn btn-sm btn-outline normal-case">
              Sign Up
            </Link>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={signOut}
            className="btn btn-sm btn-outline normal-case"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
