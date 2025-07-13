import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='min-h-screen pt-20 bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        <div className='card'>
          <div className='card-body'>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <LogIn className='w-8 h-8 text-primary-600' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Welcome Back
              </h1>
              <p className='text-gray-600'>
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                    className='form-input pl-10'
                    placeholder='Enter your email'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                    minLength='6'
                    className='form-input pl-10'
                    placeholder='Enter your password'
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='btn btn-primary w-full btn-lg group'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200' />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200'
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
