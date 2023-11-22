import { Link, Navigate, useRoutes } from 'react-router-dom';

export function AppRoutes() {
  return useRoutes([
    { index: true, element: <Navigate replace to="/home" /> },
    {
      path: '/home',
      element: (
        <div>
          <p>Home page content</p>
          <Link to="/page-1">Page 1</Link>
        </div>
      ),
    },
    {
      path: '/page-1',
      element: (
        <div>
          <p>Page 1 content</p>
          <Link to="/home">Home</Link>
        </div>
      ),
    },
  ]);
}
