import PropTypes from 'prop-types';
import {
  Globe,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Building,
  User,
  
} from 'lucide-react';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='flex flex-col md:flex-row md:items-center md:space-x-8'>
          {/* Avatar */}
          <div className='flex-shrink-0 mb-6 md:mb-0'>
            {avatar ? (
              <img
                className='w-32 h-32 rounded-full object-cover mx-auto md:mx-0 ring-4 ring-white shadow-lg'
                src={avatar}
                alt={name}
              />
            ) : (
              <div className='w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mx-auto md:mx-0 ring-4 ring-white shadow-lg'>
                <User className='w-16 h-16 text-gray-600' />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className='flex-1 text-center md:text-left'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{name}</h1>

            <div className='flex items-center justify-center md:justify-start space-x-2 mb-3'>
              <span className='text-lg text-gray-700 font-medium'>
                {status}
              </span>
              {company && (
                <>
                  <span className='text-gray-400'>at</span>
                  <div className='flex items-center space-x-1'>
                    <Building className='w-4 h-4 text-gray-500' />
                    <span className='text-lg text-primary-600 font-medium'>
                      {company}
                    </span>
                  </div>
                </>
              )}
            </div>

            {location && (
              <div className='flex items-center justify-center md:justify-start space-x-2 mb-6'>
                <MapPin className='w-4 h-4 text-gray-500' />
                <span className='text-gray-600'>{location}</span>
              </div>
            )}

            {/* Social Links */}
            <div className='flex items-center justify-center md:justify-start space-x-4'>
              {website && (
                <a
                  href={website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group'
                  title='Website'
                >
                  <Globe className='w-5 h-5 text-gray-600 group-hover:text-gray-800' />
                </a>
              )}
              {social && social.twitter && (
                <a
                  href={social.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group'
                  title='Twitter'
                >
                  <Twitter className='w-5 h-5 text-blue-500 group-hover:text-blue-600' />
                </a>
              )}
              {social && social.facebook && (
                <a
                  href={social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group'
                  title='Facebook'
                >
                  <Facebook className='w-5 h-5 text-blue-600 group-hover:text-blue-700' />
                </a>
              )}
              {social && social.linkedin && (
                <a
                  href={social.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group'
                  title='LinkedIn'
                >
                  <Linkedin className='w-5 h-5 text-blue-700 group-hover:text-blue-800' />
                </a>
              )}
              {social && social.instagram && (
                <a
                  href={social.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-200 group'
                  title='Instagram'
                >
                  <Instagram className='w-5 h-5 text-pink-600 group-hover:text-pink-700' />
                </a>
              )}
              {social && social.youtube && (
                <a
                  href={social.youtube}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 group'
                  title='YouTube'
                >
                  <Youtube className='w-5 h-5 text-red-600 group-hover:text-red-700' />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
