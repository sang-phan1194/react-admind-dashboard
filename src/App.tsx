import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import LocalCalendar from './components/calendar/LocalCalendar';
import './styles/global.scss';
import SocialPost from './pages/socialPost/SocialPost';

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
          path: '/products',
          element: <Products />
        },
        {
          path: '/posts',
          element: <SocialPost />
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
