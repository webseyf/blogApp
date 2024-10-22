import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard, PostDelete, HomeLayout, Landing, AboutUs, Login,  Register, CreatePost, PostDetails } from "./pages";
import { ToastContainer } from 'react-toastify';
// Adjust the path as necessary

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, // HomeLayout will now include the Navbar
    children: [
      {
        index: true,
        element: <Landing />,
      }, { path: "posts/:id", element: <PostDetails /> },
       { 
        path: "/posts/create", 
        element: <CreatePost />
       },
       {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "/posts/delete/:id",
        element: <PostDelete />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      }
   
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
