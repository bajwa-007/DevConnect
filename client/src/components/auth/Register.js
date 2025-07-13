import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { User, Mail, Lock, UserPlus, ArrowRight, Info } from 'lucide-react';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, password });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if registered
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
                <UserPlus className='w-8 h-8 text-primary-600' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                Create Account
              </h1>
              <p className='text-gray-600'>
                Join the developer community today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Full Name
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={onChange}
                    required
                    className='form-input pl-10'
                    placeholder='Enter your full name'
                  />
                </div>
              </div>

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
                <div className='mt-2 flex items-start space-x-2'>
                  <Info className='w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0' />
                  <p className='text-xs text-gray-500'>
                    We use Gravatar for profile images. Use a Gravatar email for
                    your profile picture.
                  </p>
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
                    placeholder='Create a password'
                  />
                </div>
                <p className='mt-1 text-xs text-gray-500'>
                  Must be at least 6 characters long
                </p>
              </div>

              <div>
                <label
                  htmlFor='password2'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Confirm Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='password2'
                    type='password'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    required
                    minLength='6'
                    className='form-input pl-10'
                    placeholder='Confirm your password'
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
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200' />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200'
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-gray-500'>
            By creating an account, you agree to our terms of service and
            privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
export default connect(mapStateToProps, { setAlert, register })(Register);
