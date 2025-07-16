import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import { Users, Search } from 'lucide-react';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  // Filter profiles based on search term
  const filteredProfiles = useMemo(() => {
    if (!searchTerm.trim()) {
      return profiles;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    return profiles.filter((profile) => {
      // Guard: if user is missing, exclude this profile
      if (!profile.user) return false;

      const { name } = profile.user;
      const { status, company, location, skills } = profile;

      // Search in name
      if (name && name.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in status
      if (status && status.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in company
      if (company && company.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in location
      if (location && location.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search in skills
      if (skills && Array.isArray(skills)) {
        return skills.some((skill) =>
          skill.toLowerCase().includes(searchLower)
        );
      }

      return false;
    });
  }, [profiles, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Search Results Counter */}
        {searchTerm.trim() && (
          <div className='mb-6'>
            <p className='text-sm text-gray-600'>
              {filteredProfiles.length === 1
                ? `Found 1 developer matching "${searchTerm}"`
                : `Found ${filteredProfiles.length} developers matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filteredProfiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        ) : searchTerm.trim() ? (
          <div className='text-center py-12'>
            <div className='card max-w-md mx-auto'>
              <div className='card-body text-center'>
                <Search className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  No Results Found
                </h3>
                <p className='text-gray-600 mb-4'>
                  No developers match your search for "{searchTerm}". Try
                  different keywords or browse all profiles.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className='btn btn-primary'
                >
                  Clear Search
                </button>
              </div>
            </div>
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
