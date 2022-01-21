import { useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import queryString from 'query-string';
import routes from '../../routes';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginUser } from '../../redux/slice/auth';
import { LoginInterface } from '../../interfaces/auth';
import { requiredValidation } from '../../validation';
import Button from '../features/Button';
import AuthLoading from '../AuthLoading';


const Login = () => {

  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const parsedQueries: any = queryString.parse(window.location.search);

  const initialValues: LoginInterface = useMemo(() => {
    return {
      username: '',
      password: '',
    }
  }, []);

  if (auth.isLoading) {
    return <AuthLoading />
  };

  if (auth.isAuthenticated) {
    return <Navigate to={parsedQueries.next || '/'} />
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-3">
        <div className="px-2 py-10 sm:px-10 sm:bg-white sm:border">
          <div>
            <h1 className="logo-font text-center text-5xl cursor-default font-extrabold text-gray-900">Instagram</h1>
          </div>
          <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string()
            .required(requiredValidation.message),
            password: Yup.string()
            .required(requiredValidation.message)
          })}
          onSubmit={(values) => {
              dispatch(loginUser(values));
            }
          }
          >
            {({
              values,
              errors,
              handleChange, 
              handleSubmit,
              handleBlur,
              touched
            }) => (
              <form 
              className="mt-8 space-y-6" 
              method="POST"
              onSubmit={handleSubmit}
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-2">
                    <label htmlFor="username" className="sr-only">
                      Username
                    </label>
                    <input
                      required
                      id="username"
                      name="username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none relative block 
                      w-full px-3 py-2 bg-gray-100 border border-gray-300 
                      placeholder-gray-500 text-gray-900 rounded 
                      focus:outline-none focus:border-gray-400 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                    {
                      touched.username
                      &&
                      errors.username 
                      &&
                      <div className="text-red-600 fw-medium mt-2 mb-4 text-sm">
                        {errors.username}
                      </div> 
                    }
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      required
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none relative block 
                      w-full px-3 py-2 bg-gray-100 border border-gray-300 
                      placeholder-gray-500 text-gray-900 rounded 
                      focus:outline-none focus:border-gray-400 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    {
                      touched.password
                      &&
                      errors.password 
                      &&
                      <div className="text-red-600 fw-medium mt-2 mb-4 text-sm">
                        {errors.password}
                      </div> 
                    }
                  </div>
                </div>
                <div>
                <Button
                  type="submit"
                  text="Log in"
                  symbol={
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </span>
                  }
                  loading={auth.loginLoading}
                  className="group relative w-full flex justify-center 
                  py-2 px-4 border border-transparent text-sm font-medium 
                  rounded text-white bg-blue-500 focus:bg-blue-400 
                  focus:outline-none" />
                </div>
                <div className="text-center">
                  <Link to={routes.resetPassword} className="text-gray-700 focus:text-gray-400 text-sm">
                    Forgot password?
                  </Link>
                </div>
              </form>
            )}
          </Formik>  
        </div>
        <div className="py-4 px-2 sm:px-10 sm:bg-white sm:border">
          <div className="text-center">
            <div>
              Don't have an account?
              <Link to={routes.register} className="font-medium text-blue-500
              focus:text-blue-300 ml-1">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;