import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { User, Plus, AlertTriangle, Sparkles } from 'lucide-react';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      deleteAccount();
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen pt-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Spinner loading={loading} text='Loading your dashboard...' />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              <Sparkles className='w-6 h-6 text-primary-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
          </div>
          <div className='flex items-center space-x-2 text-gray-600'>
            <User className='w-5 h-5' />
            <p className='text-lg'>
              Welcome back,{' '}
              <span className='font-semibold text-gray-900'>{user?.name}</span>
            </p>
          </div>
        </div>

        {profile !== null ? (
          <div className='space-y-8'>
            {/* Quick Actions */}
            <DashboardActions />

            {/* Experience and Education Grid */}
            <div className='grid lg:grid-cols-2 gap-8'>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </div>

            {/* Danger Zone */}
            <div className='card border-danger-200 bg-danger-50'>
              <div className='card-body'>
                <div className='flex items-center space-x-3 mb-4'>
                  <AlertTriangle className='w-6 h-6 text-danger-600' />
                  <h3 className='text-lg font-semibold text-danger-900'>
                    Danger Zone
                  </h3>
                </div>
                <p className='text-danger-700 mb-4'>
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <button
                  className='btn btn-danger inline-flex items-center space-x-2'
                  onClick={handleDeleteAccount}
                >
                  <User className='w-4 h-4' />
                  <span>Delete My Account</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='card max-w-md mx-auto'>
              <div className='card-body text-center'>
                <div className='w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <User className='w-8 h-8 text-primary-600' />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Complete Your Profile
                </h3>
                <p className='text-gray-600 mb-6'>
                  You haven't set up your profile yet. Add some information
                  about yourself to get started.
                </p>
                <Link
                  to='/create-profile'
                  className='btn-primary btn-lg w-full inline-flex items-center justify-center space-x-2'
                >
                  <Plus className='w-5 h-5' />
                  <span>Create Profile</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
