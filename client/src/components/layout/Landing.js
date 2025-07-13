import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { ArrowRight, Code, Users, MessageSquare, Star } from 'lucide-react';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  const features = [
    {
      icon: <Code className='w-8 h-8' />,
      title: 'Developer Profiles',
      description:
        'Create comprehensive profiles showcasing your skills, experience, and projects',
    },
    {
      icon: <Users className='w-8 h-8' />,
      title: 'Connect & Network',
      description:
        'Connect with developers worldwide and build your professional network',
    },
    {
      icon: <MessageSquare className='w-8 h-8' />,
      title: 'Share & Discuss',
      description:
        'Share posts, ask questions, and engage in meaningful discussions',
    },
  ];

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='landing-bg min-h-screen flex items-center justify-center relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl'></div>
        </div>

        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='animate-fade-in'>
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-6 leading-tight'>
              Developer
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200'>
                Connector
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed'>
              Create a developer profile/portfolio, share posts and get help
              from other developers around the world
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Link
                to='/register'
                className='group btn btn-lg bg-white text-primary-600 hover:bg-gray-50 hover:text-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center'
              >
                Get Started
                <ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200' />
              </Link>
              <Link
                to='/login'
                className='btn btn-lg glass text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm'
              >
                Sign In
              </Link>
            </div>

            <div className='mt-12 flex items-center justify-center space-x-8 text-blue-200'>
              <div className='flex items-center space-x-2'>
                <Star className='w-5 h-5 fill-current' />
                <span className='text-sm'>Trusted by developers</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Users className='w-5 h-5' />
                <span className='text-sm'>Growing community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Everything you need to grow as a developer
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Join our platform and take your development career to the next
              level
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-large transition-all duration-300 transform hover:-translate-y-2'
              >
                <div className='text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300'>
                  {feature.icon}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 bg-gradient-to-r from-primary-600 to-blue-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to join the community?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Start building your developer profile today and connect with
            thousands of developers
          </p>
          <Link
            to='/register'
            className='btn btn-lg bg-white text-primary-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
          >
            Create Your Profile
            <ArrowRight className='ml-2 w-5 h-5' />
          </Link>
        </div>
      </section>
    </div>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
