import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { useEffect } from 'react';
import { Github, Star, Eye, GitFork, ExternalLink } from 'lucide-react';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-primary-100 rounded-lg'>
            <Github className='w-5 h-5 text-primary-600' />
          </div>
          <h2 className='text-xl font-semibold text-gray-900'>
            GitHub Repositories
          </h2>
        </div>
      </div>
      <div className='card-body'>
        {repos === null ? (
          <div className='flex justify-center py-8'>
            <Spinner loading={true} text='Loading repositories...' />
          </div>
        ) : repos.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {repos.slice(0, 6).map((repo) => (
              <div
                key={repo.id}
                className='border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors duration-200'
              >
                <div className='flex items-start justify-between mb-3'>
                  <h4 className='text-lg font-semibold text-gray-900 truncate'>
                    <a
                      href={repo.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:text-primary-600 transition-colors duration-200 flex items-center space-x-2'
                    >
                      <span>{repo.name}</span>
                      <ExternalLink className='w-4 h-4' />
                    </a>
                  </h4>
                </div>

                {repo.description && (
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                    {repo.description}
                  </p>
                )}

                <div className='flex items-center space-x-4 text-sm text-gray-500'>
                  <div className='flex items-center space-x-1'>
                    <Star className='w-4 h-4' />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Eye className='w-4 h-4' />
                    <span>{repo.watchers_count}</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <GitFork className='w-4 h-4' />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                {repo.language && (
                  <div className='mt-3'>
                    <span className='inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md'>
                      {repo.language}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <Github className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No Repositories Found
            </h3>
            <p className='text-gray-600'>
              No public repositories found for this user.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
