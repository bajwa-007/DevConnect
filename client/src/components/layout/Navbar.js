import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';
import {
  User,
  LogOut,
  Code,
  Users,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const authLinks = (
    <div className='flex items-center space-x-1'>
      <Link
        to='/profiles'
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActiveLink('/profiles')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Users size={18} className='mr-2' />
        <span className='hidden sm:inline'>Developers</span>
      </Link>
      <Link
        to='/posts'
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActiveLink('/posts')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <MessageSquare size={18} className='mr-2' />
        <span className='hidden sm:inline'>Posts</span>
      </Link>
      <Link
        to='/dashboard'
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActiveLink('/dashboard')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <User size={18} className='mr-2' />
        <span className='hidden sm:inline'>Dashboard</span>
      </Link>
      <button
        onClick={logout}
        className='flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200'
      >
        <LogOut size={18} className='mr-2' />
        <span className='hidden sm:inline'>Logout</span>
      </button>
    </div>
  );

  const guestLinks = (
    <div className='flex items-center space-x-1'>
      <Link
        to='/profiles'
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActiveLink('/profiles')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Users size={18} className='mr-2' />
        Developers
      </Link>
      <Link
        to='/register'
        className='px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200'
      >
        Register
      </Link>
      <Link to='/login' className='btn-primary btn-sm'>
        Login
      </Link>
    </div>
  );

  const mobileAuthLinks = (
    <div className='px-2 pt-2 pb-3 space-y-1'>
      <Link
        to='/profiles'
        className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
          isActiveLink('/profiles')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Users size={20} className='mr-3' />
        Developers
      </Link>
      <Link
        to='/posts'
        className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
          isActiveLink('/posts')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <MessageSquare size={20} className='mr-3' />
        Posts
      </Link>
      <Link
        to='/dashboard'
        className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
          isActiveLink('/dashboard')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <User size={20} className='mr-3' />
        Dashboard
      </Link>
      <button
        onClick={() => {
          logout();
          setIsMobileMenuOpen(false);
        }}
        className='flex items-center w-full px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200'
      >
        <LogOut size={20} className='mr-3' />
        Logout
      </button>
    </div>
  );

  const mobileGuestLinks = (
    <div className='px-2 pt-2 pb-3 space-y-1'>
      <Link
        to='/profiles'
        className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
          isActiveLink('/profiles')
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Users size={20} className='mr-3' />
        Developers
      </Link>
      <Link
        to='/register'
        className='block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200'
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Register
      </Link>
      <Link
        to='/login'
        className='block px-3 py-2 rounded-lg text-base font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200'
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Login
      </Link>
    </div>
  );

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link
              to='/'
              className='flex items-center space-x-2 text-xl font-bold gradient-text hover:opacity-80 transition-opacity duration-200'
            >
              <Code size={24} />
              <span>DevConnector</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-200 shadow-lg'>
          {!loading && (
            <Fragment>
              {isAuthenticated ? mobileAuthLinks : mobileGuestLinks}
            </Fragment>
          )}
        </div>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
