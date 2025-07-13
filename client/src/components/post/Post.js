import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { ArrowLeft, MessageSquare } from 'lucide-react';

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Spinner loading={loading} text='Loading post...' />
      </div>
    </div>
  ) : (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-6'>
          <Link
            to='/posts'
            className='btn-secondary inline-flex items-center space-x-2'
          >
            <ArrowLeft className='w-4 h-4' />
            <span>Back to Posts</span>
          </Link>
        </div>

        {/* Post */}
        <div className='mb-8'>
          <PostItem post={post} showActions={false} />
        </div>

        {/* Comment Form */}
        <div className='mb-8'>
          <CommentForm postId={post._id} />
        </div>

        {/* Comments Section */}
        <div className='card'>
          <div className='card-header'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-primary-100 rounded-lg'>
                <MessageSquare className='w-5 h-5 text-primary-600' />
              </div>
              <h2 className='text-xl font-semibold text-gray-900'>
                Comments ({post.comments.length})
              </h2>
            </div>
          </div>
          <div className='card-body'>
            {post.comments.length > 0 ? (
              <div className='space-y-6'>
                {post.comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                  />
                ))}
              </div>
            ) : (
              <div className='text-center py-8'>
                <MessageSquare className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No Comments Yet
                </h3>
                <p className='text-gray-600'>
                  Be the first to share your thoughts on this post!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
