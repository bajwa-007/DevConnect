import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteComment } from '../../actions/post';
import { Trash2, User } from 'lucide-react';
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <div className='flex space-x-4 p-4 border-b border-gray-100 last:border-b-0'>
    {/* Avatar */}
    <Link to={`/profile/${user}`} className='flex-shrink-0'>
      {avatar ? (
        <img
          className='w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 hover:ring-primary-300 transition-all duration-200'
          src={avatar}
          alt={name}
        />
      ) : (
        <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
          <User className='w-5 h-5 text-gray-600' />
        </div>
      )}
    </Link>

    {/* Comment Content */}
    <div className='flex-1 min-w-0'>
      {/* Header */}
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center space-x-2'>
          <Link
            to={`/profile/${user}`}
            className='font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200'
          >
            {name}
          </Link>
          <span className='text-gray-400'>•</span>
          <time className='text-sm text-gray-500'>
            {format(new Date(date), 'MMM d, yyyy')}
          </time>
        </div>

        {/* Delete Button */}
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type='button'
            className='text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-md hover:bg-red-50'
            title='Delete comment'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* Comment Text */}
      <div className='text-gray-700 leading-relaxed'>{text}</div>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
