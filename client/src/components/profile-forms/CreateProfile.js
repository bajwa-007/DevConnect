import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState } from 'react';
import { createProfile } from '../../actions/profile';
import { useNavigate, Link } from 'react-router-dom';
import {
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  User,
  Building,
  Globe,
  MapPin,
  Code,
  Github,
  FileText,
  Plus,
  ArrowLeft,
  Save,
} from 'lucide-react';

const CreateProfile = ({ createProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate);
  };
  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              <User className='w-6 h-6 text-primary-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Create Your Profile
            </h1>
          </div>
          <p className='text-lg text-gray-600 mb-2'>
            Let's get some information to make your profile stand out
          </p>
          <p className='text-sm text-gray-500'>
            <span className='text-red-500'>*</span> = required field
          </p>
        </div>

        {/* Form Card */}
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={(e) => onSubmit(e)} className='space-y-6'>
              {/* Professional Status */}
              <div className='form-group'>
                <label className='form-label required flex items-center space-x-2'>
                  <User className='w-4 h-4' />
                  <span>Professional Status</span>
                </label>
                <select
                  name='status'
                  value={status}
                  onChange={(e) => onChange(e)}
                  className='form-select'
                  required
                >
                  <option value=''>Select Professional Status</option>
                  <option value='Developer'>Developer</option>
                  <option value='Junior Developer'>Junior Developer</option>
                  <option value='Senior Developer'>Senior Developer</option>
                  <option value='Manager'>Manager</option>
                  <option value='Student or Learning'>
                    Student or Learning
                  </option>
                  <option value='Instructor'>Instructor or Teacher</option>
                  <option value='Intern'>Intern</option>
                  <option value='Other'>Other</option>
                </select>
                <p className='form-help'>
                  Give us an idea of where you are at in your career
                </p>
              </div>

              {/* Company */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <Building className='w-4 h-4' />
                  <span>Company</span>
                </label>
                <input
                  type='text'
                  placeholder='Enter your company name'
                  name='company'
                  value={company}
                  onChange={(e) => onChange(e)}
                  className='form-input'
                />
                <p className='form-help'>
                  Could be your own company or one you work for
                </p>
              </div>

              {/* Website */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <Globe className='w-4 h-4' />
                  <span>Website</span>
                </label>
                <input
                  type='url'
                  placeholder='https://yourwebsite.com'
                  name='website'
                  value={website}
                  onChange={(e) => onChange(e)}
                  className='form-input'
                />
                <p className='form-help'>
                  Could be your own or a company website
                </p>
              </div>

              {/* Location */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <MapPin className='w-4 h-4' />
                  <span>Location</span>
                </label>
                <input
                  type='text'
                  placeholder='City, State (e.g., Boston, MA)'
                  name='location'
                  value={location}
                  onChange={(e) => onChange(e)}
                  className='form-input'
                />
                <p className='form-help'>
                  City & state suggested (e.g., Boston, MA)
                </p>
              </div>

              {/* Skills */}
              <div className='form-group'>
                <label className='form-label required flex items-center space-x-2'>
                  <Code className='w-4 h-4' />
                  <span>Skills</span>
                </label>
                <input
                  type='text'
                  placeholder='HTML, CSS, JavaScript, React, Node.js'
                  name='skills'
                  value={skills}
                  onChange={(e) => onChange(e)}
                  className='form-input'
                  required
                />
                <p className='form-help'>
                  Please use comma separated values (e.g., HTML, CSS,
                  JavaScript, PHP)
                </p>
              </div>

              {/* GitHub Username */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <Github className='w-4 h-4' />
                  <span>GitHub Username</span>
                </label>
                <input
                  type='text'
                  placeholder='your-github-username'
                  name='githubusername'
                  value={githubusername}
                  onChange={(e) => onChange(e)}
                  className='form-input'
                />
                <p className='form-help'>
                  If you want your latest repos and a GitHub link, include your
                  username
                </p>
              </div>

              {/* Bio */}
              <div className='form-group'>
                <label className='form-label flex items-center space-x-2'>
                  <FileText className='w-4 h-4' />
                  <span>Bio</span>
                </label>
                <textarea
                  placeholder='Tell us a little about yourself...'
                  name='bio'
                  value={bio}
                  onChange={(e) => onChange(e)}
                  rows={4}
                  className='form-textarea'
                />
                <p className='form-help'>Tell us a little about yourself</p>
              </div>

              {/* Social Media Toggle */}
              <div className='border-t pt-6'>
                <button
                  onClick={() => toggleSocialInputs(!displaySocialInputs)}
                  type='button'
                  className='btn btn-secondary inline-flex items-center space-x-2'
                >
                  <Plus className='w-4 h-4' />
                  <span>Add Social Network Links</span>
                </button>
                <span className='ml-2 text-sm text-gray-500'>(Optional)</span>
              </div>

              {/* Social Media Inputs */}
              {displaySocialInputs && (
                <div className='space-y-4 border-t pt-6'>
                  <h3 className='text-lg font-medium text-gray-900 mb-4'>
                    Social Media Links
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='form-group'>
                      <label className='form-label flex items-center space-x-2'>
                        <Twitter className='w-4 h-4 text-blue-400' />
                        <span>Twitter</span>
                      </label>
                      <input
                        type='url'
                        placeholder='https://twitter.com/username'
                        name='twitter'
                        value={twitter}
                        onChange={(e) => onChange(e)}
                        className='form-input'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='form-label flex items-center space-x-2'>
                        <Facebook className='w-4 h-4 text-blue-600' />
                        <span>Facebook</span>
                      </label>
                      <input
                        type='url'
                        placeholder='https://facebook.com/username'
                        name='facebook'
                        value={facebook}
                        onChange={(e) => onChange(e)}
                        className='form-input'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='form-label flex items-center space-x-2'>
                        <Linkedin className='w-4 h-4 text-blue-700' />
                        <span>LinkedIn</span>
                      </label>
                      <input
                        type='url'
                        placeholder='https://linkedin.com/in/username'
                        name='linkedin'
                        value={linkedin}
                        onChange={(e) => onChange(e)}
                        className='form-input'
                      />
                    </div>

                    <div className='form-group'>
                      <label className='form-label flex items-center space-x-2'>
                        <Youtube className='w-4 h-4 text-red-600' />
                        <span>YouTube</span>
                      </label>
                      <input
                        type='url'
                        placeholder='https://youtube.com/channel/...'
                        name='youtube'
                        value={youtube}
                        onChange={(e) => onChange(e)}
                        className='form-input'
                      />
                    </div>

                    <div className='form-group md:col-span-2'>
                      <label className='form-label flex items-center space-x-2'>
                        <Instagram className='w-4 h-4 text-pink-600' />
                        <span>Instagram</span>
                      </label>
                      <input
                        type='url'
                        placeholder='https://instagram.com/username'
                        name='instagram'
                        value={instagram}
                        onChange={(e) => onChange(e)}
                        className='form-input'
                      />
                    </div>
                  </div>
                </div>
              )}

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
                  <span>Create Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
