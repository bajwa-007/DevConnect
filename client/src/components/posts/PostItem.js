import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { Fragment } from 'react/jsx-runtime';

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

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on {date ? format(new Date(date), 'MM/dd/yyyy') : 'N/A'}
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type='button'
              className={`btn btn-light${userLiked ? ' liked' : ''}`}
              style={
                userLiked
                  ? { background: '#e6f7ff', borderColor: '#91d5ff' }
                  : {}
              }
            >
              <ThumbsUp
                size={18}
                style={{
                  verticalAlign: 'middle',
                  marginRight: 4,
                  fill: userLiked ? '#1890ff' : 'none',
                  color: userLiked ? '#1890ff' : undefined,
                }}
              />
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <ThumbsDown size={18} style={{ verticalAlign: 'middle' }} />
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user?._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type='button'
                className='btn btn-danger'
              >
                <X size={18} style={{ verticalAlign: 'middle' }} />
              </button>
            )}
          </Fragment>
        )}
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
