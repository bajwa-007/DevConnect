import PropTypes from 'prop-types';
import { format } from 'date-fns';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => (
  <div>
    <h3 className='tet-dark'>{school}</h3>
    <p>
      {format(new Date(from), 'yyyy/MM/dd')} -{' '}
      {to === null ? 'Now' : format(new Date(to), 'yyyy/MM/dd')}
    </p>
    <p>
      <strong>Degree:</strong>
      {degree}
    </p>
    <p>
      <strong>Field of Study:</strong>
      {fieldofstudy}
    </p>
    <p>
      <strong>Description:</strong>
      {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
