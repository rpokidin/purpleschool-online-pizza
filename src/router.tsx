import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AsideLayout } from './layout/AsideLayout/AsideLayout';
import { AuthLayout } from './layout/AuthLayout/AuthLayout';
import { Cart } from './pages/Cart/Cart';
import { NotFound } from './pages/NotFound/NotFound';
import { Product } from './pages/Product/Product';
import axios, { AxiosError } from 'axios';
import { PREFIX } from './helpers/API';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { RequireAuth } from './helpers/RequireAuth';
import { Success } from './pages/Success/Success';

const Menu = lazy(() => import('./pages/Menu/Menu'));

interface ProductLoaderResult {
  error?: string;
  data?: [];
}

interface RouteParams {
  id?: string;
}

interface LoaderArgs {
  params: RouteParams;
}

const productLoader = async ({ params }: LoaderArgs): Promise<ProductLoaderResult> => {
  try {
    if (!params.id) return { error: 'Product ID is required' };

    const productId = parseInt(params.id, 10);

    if (isNaN(productId)) return { error: 'Invalid product ID' };

    const { data } = await axios.get(`${PREFIX}/products/${productId}`);
    return { data };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Product loader error:', axiosError.message);

    return {
      error: axiosError.response?.status === 404
        ? 'Product not found'
        : 'Failed to load product'
    };
  }
};

export const createAppRouter = () => createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <AsideLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div className="loading">Загрузка меню...</div>}>
            <Menu />
          </Suspense>
        )
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<div className="loading">Загрузка продукта...</div>}>
            <Product />
          </Suspense>
        ),
        errorElement: <div className="error">Ошибка загрузки продукта</div>,
        loader: productLoader
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: (
          <Login />
        )
      },
      {
        path: 'register',
        element: <Register />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
