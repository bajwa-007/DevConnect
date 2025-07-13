import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Trash2,
  Calendar,
} from 'lucide-react';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  showActions,
}) => {
  // Check if the current user has liked this post
  const userLiked = likes.some((like) => like.user === auth.user?._id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(_id);
    }
  };

  return (
    <div className='card hover:shadow-md transition-shadow duration-200'>
      <div className='card-body'>
        <div className='flex items-start space-x-4'>
          {/* User Avatar and Info */}
          <div className='flex-shrink-0'>
            <Link to={`/profile/${user}`} className='group'>
              <img
                className='w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-primary-200 transition-all duration-200'
                src={avatar}
                alt={`${name}'s avatar`}
              />
            </Link>
          </div>

          {/* Post Content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between mb-3'>
              <div>
                <Link
                  to={`/profile/${user}`}
                  className='font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200'
                >
                  {name}
                </Link>
                <div className='flex items-center space-x-2 mt-1 text-sm text-gray-500'>
                  <Calendar className='w-4 h-4' />
                  <span>
                    {date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Delete button for post owner */}
              {!auth.loading && user === auth.user?._id && showActions && (
                <button
                  onClick={handleDelete}
                  className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                  title='Delete post'
                >
                  <Trash2 className='w-4 h-4' />
                </button>
              )}
            </div>

            {/* Post Text */}
            <div className='mb-4'>
              <p className='text-gray-800 leading-relaxed whitespace-pre-wrap'>
                {text}
              </p>
            </div>

            {/* Actions */}
            {showActions && (
              <div className='flex items-center space-x-2 pt-3 border-t border-gray-100'>
                {/* Like Button */}
                <button
                  onClick={() => addLike(_id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    userLiked
                      ? 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${userLiked ? 'fill-current' : ''}`}
                  />
                  {likes.length > 0 && (
                    <span className='font-semibold'>{likes.length}</span>
                  )}
                </button>

                {/* Unlike Button */}
                <button
                  onClick={() => removeLike(_id)}
                  className='flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200'
                >
                  <ThumbsDown className='w-4 h-4' />
                </button>

                {/* Comments Button */}
                <Link
                  to={`/posts/${_id}`}
                  className='flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200'
                >
                  <MessageCircle className='w-4 h-4' />
                  <span>Discussion</span>
                  {comments.length > 0 && (
                    <span className='bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full text-xs font-semibold'>
                      {comments.length}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
