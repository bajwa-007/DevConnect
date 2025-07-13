import PropTypes from 'prop-types';
import { format } from 'date-fns';

const ProfileExperience = ({
  experience: { company, title, location, from, to, current, description },
}) => (
  <div>
    <h3 className='tet-dark'>{company}</h3>
    <p>
      {format(new Date(from), 'yyyy/MM/dd')} -{' '}
      {to === null ? 'Now' : format(new Date(to), 'yyyy/MM/dd')}
    </p>
    <p>
      <strong>Position:</strong>
      {title}
    </p>
    <p>
      <strong>Description:</strong>
      {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
