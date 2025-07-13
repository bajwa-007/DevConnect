import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import { MessageSquare, Users } from 'lucide-react';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) {
    return (
      <div className='min-h-screen pt-20 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Spinner loading={loading} text='Loading posts...' />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center space-x-3 mb-4'>
            <div className='p-2 bg-primary-100 rounded-lg'>
              <MessageSquare className='w-6 h-6 text-primary-600' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900'>
              Community Posts
            </h1>
          </div>
          <div className='flex items-center space-x-2 text-gray-600'>
            <Users className='w-5 h-5' />
            <p className='text-lg'>
              Welcome to the community! Share your thoughts and connect with
              fellow developers.
            </p>
          </div>
        </div>

        {/* Post Form */}
        <div className='mb-8'>
          <PostForm />
        </div>

        {/* Posts List */}
        <div className='space-y-6'>
          {posts.length > 0 ? (
            posts.map((post) => <PostItem key={post._id} post={post} />)
          ) : (
            <div className='text-center py-12'>
              <div className='card max-w-md mx-auto'>
                <div className='card-body text-center'>
                  <MessageSquare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    No Posts Yet
                  </h3>
                  <p className='text-gray-600'>
                    Be the first to share something with the community!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
