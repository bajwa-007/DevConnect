import { connect } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { useParams, Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { ArrowLeft, Edit3, Briefcase, GraduationCap } from 'lucide-react';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (loading || profile === null) {
    return (
      <div className='min-h-screen pt-20 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Spinner loading={loading} text='Loading profile...' />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header Actions */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
          <Link
            to='/profiles'
            className='btn btn-secondary inline-flex items-center space-x-2 mb-4 sm:mb-0'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Profiles</span>
          </Link>

          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user &&
            profile.user &&
            auth.user._id === profile.user._id && (
              <Link
                to='/edit-profile'
                className='btn btn-primary inline-flex items-center space-x-2'
              >
                <Edit3 className='w-4 h-4' />
                <span>Edit Profile</span>
              </Link>
            )}
        </div>

        {/* Profile Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Profile Info - Full Width on Mobile, 2 cols on Desktop */}
          <div className='lg:col-span-3'>
            <ProfileTop profile={profile} />
          </div>

          <div className='lg:col-span-3'>
            <ProfileAbout profile={profile} />
          </div>

          {/* Experience Section */}
          <div className='lg:col-span-3'>
            <div className='card'>
              <div className='card-header'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-primary-100 rounded-lg'>
                    <Briefcase className='w-5 h-5 text-primary-600' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Experience
                  </h2>
                </div>
              </div>
              <div className='card-body'>
                {profile.experience.length > 0 ? (
                  <div className='space-y-6'>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <Briefcase className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      No Experience Listed
                    </h3>
                    <p className='text-gray-600'>
                      This user hasn't added any work experience yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className='lg:col-span-3'>
            <div className='card'>
              <div className='card-header'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-primary-100 rounded-lg'>
                    <GraduationCap className='w-5 h-5 text-primary-600' />
                  </div>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Education
                  </h2>
                </div>
              </div>
              <div className='card-body'>
                {profile.education.length > 0 ? (
                  <div className='space-y-6'>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <GraduationCap className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      No Education Listed
                    </h3>
                    <p className='text-gray-600'>
                      This user hasn't added any education credentials yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* GitHub Section */}
          {profile.githubusername && (
            <div className='lg:col-span-3'>
              <ProfileGithub username={profile.githubusername} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
