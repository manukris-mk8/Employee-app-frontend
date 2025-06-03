import './App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import LoadingComponent from './components/loadingComponent/LoadingComponent';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';

const Login = React.lazy(() => import('./pages/login/Login'));
const Layout = React.lazy(() => import('./components/layout/Layout'));
const CreateEmployee = React.lazy(() => import('./pages/create-employee/CreateEmployee'));
const NotFound = React.lazy(() => import('./pages/notFound/NotFound'));
const ListEmployees = React.lazy(() => import('./pages/list-employees/ListEmployees'));
const EmployeeDetails = React.lazy(() => import('./pages/employee-details/EmployeeDetails'));
const EditEmployee = React.lazy(() => import('./pages/edit-employee/EditEmployee'));

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  // console.log(login);
  if(token){
    return true
  }
  return false;
};

const PublicRouteChecker = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = isLoggedIn();

  if (loggedIn) return <Navigate to='/employees' />;
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/employees" />
  },
  {
    path: '/login',
    element: (
      <React.Suspense fallback={<LoadingComponent />}>
        <PublicRouteChecker>
          <Login />
        </PublicRouteChecker>
      </React.Suspense>
    )
  },
  {
    path: '/employees',
    element: (
      <React.Suspense fallback={<LoadingComponent />}>
        <Layout />
      </React.Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <ListEmployees />
          </React.Suspense>
        )
      },
      {
        path: "create",
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <CreateEmployee />
          </React.Suspense>
        )
      },
      {
        path: "edit/:id",
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <EditEmployee />
          </React.Suspense>
        )
      },
      {
        path: "details/:id",
        element: (
          <React.Suspense fallback={<LoadingComponent />}>
            <EmployeeDetails />
          </React.Suspense>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <React.Suspense fallback={<LoadingComponent />}>
        <NotFound />
      </React.Suspense>
    )
  }
]);

function App() {
  return (
    <div>
      <Provider store={store}>
      <Suspense fallback={<LoadingComponent />}>
        <RouterProvider router={router} />
      </Suspense>
      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
