import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const ProfileItem = ({ profile }) => {
  // Guard: if user is missing, don't render this profile
  if (!profile.user) return null;

  const { _id, name, avatar } = profile.user;
  const { status, company, location, skills } = profile;

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <Check
              size={16}
              style={{ marginRight: 4, verticalAlign: 'middle' }}
            />{' '}
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
