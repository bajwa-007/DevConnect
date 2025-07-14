import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  GraduationCap,
  School,
  Award,
  BookOpen,
  Calendar,
  FileText,
  ArrowLeft,
  Save,
} from 'lucide-react';

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const navigate = useNavigate();

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, navigate);
  };

  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              <GraduationCap className='w-6 h-6 text-primary-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900'>Add Education</h1>
          </div>
          <p className='text-lg text-gray-600 mb-2'>
            Add any school, bootcamp, or educational program that you have
            attended
          </p>
          <p className='text-sm text-gray-500'>
            <span className='text-red-500'>*</span> = required field
          </p>
        </div>

        {/* Form Card */}
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={onSubmit} className='space-y-6'>
              {/* School */}
              <div className='form-group'>
                <label className='form-label required flex items-center space-x-2'>
                  <School className='w-4 h-4' />
                  <span>School or Institution</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g., Harvard University, Lambda School, freeCodeCamp'
                  name='school'
                  value={school}
                  onChange={onChange}
                  className='form-input'
                  required
                />
              </div>

              {/* Degree */}
              <div className='form-group'>
                <label className='form-label required flex items-center space-x-2'>
                  <Award className='w-4 h-4' />
                  <span>Degree or Certificate</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g., Bachelor of Science, Full Stack Web Development Certificate'
                  name='degree'
                  value={degree}
                  onChange={onChange}
                  className='form-input'
                  required
                />
              </div>

              {/* Field of Study */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <BookOpen className='w-4 h-4' />
                  <span>Field of Study</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g., Computer Science, Web Development, Software Engineering'
                  name='fieldofstudy'
                  value={fieldofstudy}
                  onChange={onChange}
                  className='form-input'
                />
              </div>

              {/* Date Range */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* From Date */}
                <div className='form-group'>
                  <label className='form-label required'>
                    <Calendar className='w-4 h-4' />
                    From Date
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
                  <label className='form-label'>
                    <Calendar className='w-4 h-4' />
                    To Date
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

              {/* Current Program Checkbox */}
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
                    I am currently enrolled in this program
                  </label>
                </div>
              </div>

              {/* Program Description */}
              <div className='form-group'>
                <label className='form-label'>
                  <FileText className='w-4 h-4' />
                  Program Description
                </label>
                <textarea
                  name='description'
                  rows={5}
                  placeholder='Describe the program, coursework, achievements, or relevant projects...'
                  value={description}
                  onChange={onChange}
                  className='form-textarea'
                />
                <p className='form-help'>
                  Describe the program, key coursework, or any notable
                  achievements
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
                  <span>Add Education</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
