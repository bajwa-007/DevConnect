import PropTypes from 'prop-types';

import { Check, User, Code } from 'lucide-react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => (
  <div className='card'>
    <div className='card-body'>
      {bio && (
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              <User className='w-5 h-5 text-primary-600' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>
              {name.trim().split(' ')[0]}'s Bio
            </h2>
          </div>
          <div className='prose prose-gray max-w-none'>
            <p className='text-gray-700 leading-relaxed'>{bio}</p>
          </div>
        </div>
      )}

      <div>
        <div className='flex items-center space-x-3 mb-6'>
          <div className='p-2 bg-primary-100 rounded-lg'>
            <Code className='w-5 h-5 text-primary-600' />
          </div>
          <h2 className='text-xl font-semibold text-gray-900'>Skills</h2>
        </div>

        {skills && skills.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill, index) => (
              <span
                key={index}
                className='inline-flex items-center space-x-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium'
              >
                <Check className='w-4 h-4' />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <Code className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Skills Listed
            </h3>
            <p className='text-gray-600'>
              This user hasn't added any skills yet.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
