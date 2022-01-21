import { useMemo, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { UserAddIcon } from '@heroicons/react/solid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../../routes';
import { Toast } from '../../utils/messages';
import requests from '../../utils/requests';
import { useAppSelector } from '../../redux/store';
import { formikSetError } from '../../utils/setError';
import { RegisterInterface } from '../../interfaces/auth';
import { requiredValidation, emailValidation } from '../../validation';
import { usernameValidation, passwordValidation } from '../../validation/register';
import Button from '../features/Button';
import AuthLoading from '../AuthLoading';


const Register = () => {

  const navigate = useNavigate();

  const auth = useAppSelector(state => state.auth);

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const initialValues: RegisterInterface = useMemo(() => {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  }, []);

  if (auth.isLoading) {
    return <AuthLoading />
  };

  if (auth.isAuthenticated) {
    <Navigate to="/" replace />
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-3">
        <div className="px-2 py-10 sm:px-10 sm:bg-white sm:border">
          <div>
            <h1 className="logo-font mb-6 text-center text-5xl font-extrabold text-gray-900 cursor-default">Instagram</h1>
            <div className="text-center">
              <span className="font-bold text-gray-400">Sign up to see photos and videos from your friends.</span>
            </div>
          </div>
          <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
          username: Yup.string()
          .required(requiredValidation.message)
          .max(usernameValidation.maxLength, usernameValidation.maxLengthMessage),
          email: Yup.string()
          .email(emailValidation.message)
          .required(requiredValidation.message),
          password: Yup.string()
          .required(requiredValidation.message)
          .min(passwordValidation.minLength, passwordValidation.minLengthMessage),
          confirm_password: Yup.string()
          .required(requiredValidation.message)
          .oneOf([Yup.ref('password'), null], passwordValidation.notMatchMessage)
          })}
          onSubmit={
            async (values, {setFieldError}) => {
              try {
                setRegisterLoading(true);
                await axios.post(requests.register, values);
                Toast.fire({
                  title: 'Register success!',
                  text: 'Redirecting to login page...',
                  icon: 'success',
                  timer: 2000
                }).then(() => {
                  navigate('/login');
                });
              } catch (e: any) {
                const { response } = e;
                if (response.status === 400) {
                  formikSetError(response, setFieldError);
                } else {
                  Toast.fire({
                    title: 'Register faild!',
                    text: 'Something went wrong, please try again!',
                    icon: 'error',
                    timer: 2000
                  });
                }
              } finally {
                setRegisterLoading(false);
              }
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
                <div className="rounded-md">
                  <div className="mb-2">
                    <label htmlFor="username" className="sr-only ">
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
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.username}
                      </div> 
                      }
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                    required
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none relative block 
                      w-full px-3 py-2 bg-gray-100 border border-gray-300 
                      placeholder-gray-500 text-gray-900 rounded 
                      focus:outline-none focus:border-gray-400 focus:z-10 sm:text-sm"
                      placeholder="Email"
                    />
                    {
                      touched.email
                      &&
                      errors.email 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.email}
                      </div> 
                    }
                  </div>
                  <div className="mb-2">
                    <label htmlFor="password" className="sr-only ">
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
                      className="appearance-none  relative block 
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
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.password}
                      </div> 
                      }
                  </div>
                  <div className="mb-2">
                    <label htmlFor="confirm_password" className="sr-only">
                      Re-enter password
                    </label>
                    <input
                    required
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none  relative block 
                      w-full px-3 py-2 bg-gray-100 border border-gray-300 
                      placeholder-gray-500 text-gray-900 rounded 
                      focus:outline-none focus:border-gray-400 focus:z-10 sm:text-sm"
                      placeholder="Re-enter password"
                    />
                    {
                      touched.confirm_password
                      &&
                      errors.confirm_password 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.confirm_password}
                      </div> 
                    }
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    text="Sign up"
                    symbol={
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <UserAddIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                      </span>
                    }
                    loading={registerLoading}
                    className="group relative w-full flex justify-center 
                    py-2 px-4 border border-transparent text-sm font-medium 
                    rounded text-white bg-blue-500 focus:bg-blue-400 
                    focus:outline-none" />
                </div>
                <div className="text-center">
                <span className="text-xs text-gray-500">By signing up, you agree to our Terms , Data Policy and Cookies Policy .</span>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="py-4 px-2 sm:px-10 sm:bg-white sm:border">
          <div className="text-center">
            <div>
              Have an account?
              <Link to={routes.login} className="font-medium text-blue-500
              focus:text-blue-300 ml-1">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register;