import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { deleteExperience } from '../../actions/profile';
import { Briefcase, Calendar, Trash2, Building } from 'lucide-react';

const Experience = ({ experience, deleteExperience }) => {
  const handleDelete = (id, company) => {
    if (
      window.confirm(
        `Are you sure you want to delete your experience at ${company}?`
      )
    ) {
      deleteExperience(id);
    }
  };

  if (!experience || experience.length === 0) {
    return (
      <div className='card'>
        <div className='card-body text-center py-8'>
          <Briefcase className='w-12 h-12 text-gray-400 mx-auto mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No Experience Added
          </h3>
          <p className='text-gray-500'>
            Add your work experience to showcase your professional journey.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='flex items-center space-x-3 mb-6'>
          <Briefcase className='w-6 h-6 text-gray-600' />
          <h2 className='text-xl font-semibold text-gray-900'>
            Work Experience
          </h2>
        </div>

        <div className='space-y-4'>
          {experience.map((exp) => (
            <div
              key={exp._id}
              className='p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center space-x-2 mb-2'>
                    <Building className='w-5 h-5 text-gray-500' />
                    <h3 className='font-semibold text-gray-900'>
                      {exp.company}
                    </h3>
                  </div>

                  <p className='text-primary-600 font-medium mb-2'>
                    {exp.title}
                  </p>

                  <div className='flex items-center space-x-2 text-sm text-gray-500 mb-3'>
                    <Calendar className='w-4 h-4' />
                    <span>
                      {format(new Date(exp.from), 'MMM yyyy')} -{' '}
                      {exp.to
                        ? format(new Date(exp.to), 'MMM yyyy')
                        : 'Present'}
                    </span>
                  </div>

                  {exp.description && (
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      {exp.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(exp._id, exp.company)}
                  className='ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                  title='Delete experience'
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

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
