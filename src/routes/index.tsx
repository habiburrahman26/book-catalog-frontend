import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AllBook from "../pages/AllBook";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import BookDetails from "../pages/BookDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBook />,
      },
      {
        path: "/book/:bookId",
        element: <BookDetails />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      {
        path: "/edit-book/:bookId",
        element: <EditBook />,
      },

      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default routes;
