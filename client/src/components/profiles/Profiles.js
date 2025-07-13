import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import { Users, Search } from 'lucide-react';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (loading) {
    return (
      <div className='min-h-screen pt-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Spinner loading={loading} text='Loading developer profiles...' />
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
              <Users className='w-6 h-6 text-primary-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900'>Developers</h1>
          </div>
          <p className='text-lg text-gray-600'>
            Browse and connect with talented developers from around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className='mb-8'>
          <div className='relative max-w-md'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              className='form-input pl-10'
              placeholder='Search developers by name, skills, or location...'
            />
          </div>
        </div>

        {/* Profiles Grid */}
        {profiles.length > 0 ? (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='card max-w-md mx-auto'>
              <div className='card-body text-center'>
                <Users className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  No Profiles Found
                </h3>
                <p className='text-gray-600'>
                  Be the first to create a developer profile and join our
                  community!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
