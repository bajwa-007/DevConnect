import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
  Save,
} from 'lucide-react';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const navigate = useNavigate();

  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, navigate);
  };

  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              <Briefcase className='w-6 h-6 text-primary-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900'>Add Experience</h1>
          </div>
          <p className='text-lg text-gray-600 mb-2'>
            Add any developer/programming positions that you have had in the
            past
          </p>
          <p className='text-sm text-gray-500'>
            <span className='text-red-500'>*</span> = required field
          </p>
        </div>

        {/* Form Card */}
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={(e) => onSubmit(e)} className='space-y-6'>
              {/* Job Title */}
              <div className='form-group'>
                <label className='form-label required flex items-center space-x-2'>
                  <Briefcase className='w-4 h-4' />
                  <span>Job Title</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g., Senior Frontend Developer'
                  name='title'
                  value={title}
                  onChange={onChange}
                  className='form-input'
                  required
                />
              </div>

              {/* Company */}
              <div className='form-group'>
                <label className='form-label required flex items-center space-x-2'>
                  <Building className='w-4 h-4' />
                  <span>Company</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g., Google, Microsoft, Startup Inc.'
                  name='company'
                  value={company}
                  onChange={onChange}
                  className='form-input'
                  required
                />
              </div>

              {/* Location */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <MapPin className='w-4 h-4' />
                  <span>Location</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g., San Francisco, CA or Remote'
                  name='location'
                  value={location}
                  onChange={onChange}
                  className='form-input'
                />
              </div>

              {/* Date Range */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* From Date */}
                <div className='form-group'>
                  <label className='form-label required flex items-center space-x-2'>
                    <Calendar className='w-4 h-4' />
                    <span>From Date</span>
                  </label>
                  <input
                    type='date'
                    name='from'
                    value={from}
                    onChange={onChange}
                    className='form-input'
                    required
                  />
                </div>

                {/* To Date */}
                <div className='form-group'>
                  <label className='form-label flex items-center space-x-2'>
                    <Calendar className='w-4 h-4' />
                    <span>To Date</span>
                  </label>
                  <input
                    type='date'
                    name='to'
                    value={to}
                    onChange={onChange}
                    disabled={toDateDisabled}
                    className={`form-input ${
                      toDateDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Current Job Checkbox */}
              <div className='form-group'>
                <div className='flex items-center space-x-3'>
                  <input
                    type='checkbox'
                    id='current'
                    name='current'
                    checked={current}
                    onChange={() => {
                      setFormData({ ...formData, current: !current });
                      toggleDisabled(!toDateDisabled);
                    }}
                    className='w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2'
                  />
                  <label
                    htmlFor='current'
                    className='text-sm font-medium text-gray-700'
                  >
                    This is my current job
                  </label>
                </div>
              </div>

              {/* Job Description */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <FileText className='w-4 h-4' />
                  <span>Job Description</span>
                </label>
                <textarea
                  name='description'
                  rows={5}
                  placeholder='Describe your role, responsibilities, and achievements...'
                  value={description}
                  onChange={onChange}
                  className='form-textarea'
                />
                <p className='form-help'>
                  Describe your key responsibilities and achievements in this
                  role
                </p>
              </div>

              {/* Form Actions */}
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center pt-6 border-t space-y-3 sm:space-y-0'>
                <Link
                  to='/dashboard'
                  className='btn btn-secondary inline-flex items-center justify-center space-x-2'
                >
                  <ArrowLeft className='w-4 h-4' />
                  <span>Go Back</span>
                </Link>

                <button
                  type='submit'
                  className='btn btn-primary inline-flex items-center justify-center space-x-2'
                >
                  <Save className='w-4 h-4' />
                  <span>Add Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
