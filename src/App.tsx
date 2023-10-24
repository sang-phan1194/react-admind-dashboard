import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Home from './pages/home/Home';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import Login from './pages/login/Login';
import './styles/global.scss';
import SingleUser from './pages/singleUser/SingleUser';
import SingleProduct from './pages/singleProduct/SingleProduct';
import { QueryClient, QueryClientProvider } from 'react-query';
import LocalCalendar from './components/calendar/LocalCalendar';

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/calendar',
          element: <LocalCalendar />
        },
        {
          path: '/users',
          element: <Users />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/users/:id',
          element: <SingleUser />
        },
        {
          path: '/products/:id',
          element: <SingleProduct />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
