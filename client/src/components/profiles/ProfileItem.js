import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MapPin, Building, Eye, Star } from 'lucide-react';

const ProfileItem = ({ profile }) => {
  // Guard: if user is missing, don't render this profile
  if (!profile.user) return null;

  const { _id, name, avatar } = profile.user;
  const { status, company, location, skills } = profile;

  return (
    <div className='card group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
      <div className='card-body'>
        {/* Profile Header */}
        <div className='flex items-center space-x-4 mb-4'>
          <div className='relative'>
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className='w-16 h-16 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-primary-200 transition-all duration-300'
            />
            <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white'></div>
          </div>
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors duration-200'>
              {name}
            </h3>
            <p className='text-primary-600 font-medium text-sm'>{status}</p>
            {company && (
              <div className='flex items-center space-x-1 text-gray-500 text-sm mt-1'>
                <Building className='w-4 h-4' />
                <span className='truncate'>at {company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        {location && (
          <div className='flex items-center space-x-2 text-gray-500 text-sm mb-4'>
            <MapPin className='w-4 h-4' />
            <span>{location}</span>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {skills.slice(0, 4).map((skill, index) => (
                <span key={index} className='badge badge-primary'>
                  {skill}
                </span>
              ))}
              {skills.length > 4 && (
                <span className='badge badge-gray'>
                  +{skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className='pt-4 border-t border-gray-100'>
          <Link
            to={`/profile/${_id}`}
            className='btn btn-primary w-full inline-flex items-center justify-center space-x-2 group/btn'
          >
            <Eye className='w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200' />
            <span>View Profile</span>
          </Link>
        </div>

        {/* Rating/Stats (placeholder for future enhancement) */}
        <div className='flex items-center justify-between mt-3 text-xs text-gray-500'>
          <div className='flex items-center space-x-1'>
            <Star className='w-3 h-3 fill-current text-yellow-400' />
            <span>4.8</span>
          </div>
          <span>Active developer</span>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
