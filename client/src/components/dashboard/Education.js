import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { deleteEducation } from '../../actions/profile';
import { GraduationCap, Calendar, Trash2, School } from 'lucide-react';

const Education = ({ education, deleteEducation }) => {
  const handleDelete = (id, school) => {
    if (
      window.confirm(
        `Are you sure you want to delete your education from ${school}?`
      )
    ) {
      deleteEducation(id);
    }
  };

  if (!education || education.length === 0) {
    return (
      <div className='card'>
        <div className='card-body text-center py-8'>
          <GraduationCap className='w-12 h-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No Education Added
          </h3>
          <p className='text-gray-500'>
            Add your educational background to complete your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='flex items-center space-x-3 mb-6'>
          <GraduationCap className='w-6 h-6 text-gray-600' />
          <h2 className='text-xl font-semibold text-gray-900'>Education</h2>
        </div>

        <div className='space-y-4'>
          {education.map((edu) => (
            <div
              key={edu._id}
              className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center space-x-2 mb-2'>
                    <School className='w-5 h-5 text-gray-500' />
                    <h3 className='font-semibold text-gray-900'>
                      {edu.school}
                    </h3>
                  </div>

                  <p className='text-primary-600 font-medium mb-2'>
                    {edu.degree}
                  </p>

                  {edu.fieldofstudy && (
                    <p className='text-gray-600 mb-2'>
                      Field of Study: {edu.fieldofstudy}
                    </p>
                  )}

                  <div className='flex items-center space-x-2 text-sm text-gray-500 mb-3'>
                    <Calendar className='w-4 h-4' />
                    <span>
                      {format(new Date(edu.from), 'MMM yyyy')} -{' '}
                      {edu.to
                        ? format(new Date(edu.to), 'MMM yyyy')
                        : 'Present'}
                    </span>
                  </div>

                  {edu.description && (
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {edu.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(edu._id, edu.school)}
                  className='ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                  title='Delete education'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
