import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Building, MapPin, Calendar, Briefcase } from 'lucide-react';

const ProfileExperience = ({
  experience: { company, title, location, from, to, current, description },
}) => (
  <div className='border-l-4 border-primary-200 pl-6 pb-6 last:pb-0'>
    <div className='flex items-start space-x-4'>
      <div className='flex-shrink-0 mt-1'>
        <div className='p-2 bg-primary-100 rounded-lg'>
          <Building className='w-4 h-4 text-primary-600' />
        </div>
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2'>
          <h3 className='text-lg font-semibold text-gray-900'>{company}</h3>
          <div className='flex items-center space-x-2 text-sm text-gray-500 mt-1 sm:mt-0'>
            <Calendar className='w-4 h-4' />
            <span>
              {format(new Date(from), 'MMM yyyy')} -{' '}
              {to === null || current
                ? 'Present'
                : format(new Date(to), 'MMM yyyy')}
            </span>
          </div>
        </div>

        <div className='flex items-center space-x-2 mb-3'>
          <Briefcase className='w-4 h-4 text-gray-500' />
          <span className='text-primary-600 font-medium'>{title}</span>
        </div>

        {location && (
          <div className='flex items-center space-x-2 mb-3'>
            <MapPin className='w-4 h-4 text-gray-500' />
            <span className='text-gray-600'>{location}</span>
          </div>
        )}

        {description && (
          <div className='prose prose-sm prose-gray max-w-none'>
            <p className='text-gray-700 leading-relaxed'>{description}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
