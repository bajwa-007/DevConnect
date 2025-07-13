import { connect } from 'react-redux';
import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { useParams, Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (loading || profile === null) {
    return (
      <section className='container'>
        <Spinner loading={loading} />
      </section>
    );
  }

  return (
    <Fragment>
      <section className='container'>
        <Link to='/profiles' className='btn btn-light'>
          Back to Profiles
        </Link>
        {auth.isAuthenticated &&
          !auth.loading &&
          auth.user &&
          profile.user &&
          auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
              Edit Profile
            </Link>
          )}
        <div class='profile-grid my-1'>
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
        </div>
      </section>
    </Fragment>
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
