import { Link } from 'react-router-dom';
import { UserCircle, Briefcase, GraduationCap } from 'lucide-react';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <UserCircle
          className='text-primary'
          style={{ marginRight: 6, verticalAlign: 'middle' }}
        />
        Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <Briefcase
          className='text-primary'
          style={{ marginRight: 6, verticalAlign: 'middle' }}
        />
        Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <GraduationCap
          className='text-primary'
          style={{ marginRight: 6, verticalAlign: 'middle' }}
        />
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
