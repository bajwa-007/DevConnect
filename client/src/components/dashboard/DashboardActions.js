import { Link } from 'react-router-dom';
import { UserCircle, Briefcase, GraduationCap, Settings } from 'lucide-react';

const DashboardActions = () => {
  const actions = [
    {
      to: '/edit-profile',
      icon: <UserCircle className='w-5 h-5' />,
      title: 'Edit Profile',
      description: 'Update your profile information',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    },
    {
      to: '/add-experience',
      icon: <Briefcase className='w-5 h-5' />,
      title: 'Add Experience',
      description: 'Add your work experience',
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
    },
    {
      to: '/add-education',
      icon: <GraduationCap className='w-5 h-5' />,
      title: 'Add Education',
      description: 'Add your educational background',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    },
  ];

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='flex items-center space-x-3 mb-6'>
          <Settings className='w-6 h-6 text-gray-600' />
          <h2 className='text-xl font-semibold text-gray-900'>Quick Actions</h2>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.to}
              className={`group p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md transform hover:-translate-y-1 ${action.color}`}
            >
              <div className='flex items-center space-x-3 mb-2'>
                <div className='text-gray-600 group-hover:text-gray-800 transition-colors duration-200'>
                  {action.icon}
                </div>
                <h3 className='font-medium text-gray-900 group-hover:text-gray-800'>
                  {action.title}
                </h3>
              </div>
              <p className='text-sm text-gray-600 group-hover:text-gray-700'>
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardActions;
