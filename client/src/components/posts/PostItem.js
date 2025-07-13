import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
}) => (
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
      <button type='button' className='btn btn-light'>
        <ThumbsUp
          size={18}
          style={{ verticalAlign: 'middle', marginRight: 4 }}
        />{' '}
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button type='button' className='btn btn-light'>
        <ThumbsDown size={18} style={{ verticalAlign: 'middle' }} />
      </button>
      <Link to={`/posts/${_id}`} className='btn btn-primary'>
        Discussion{' '}
        {comments.length > 0 && (
          <span className='comment-count'>{comments.length}</span>
        )}
      </Link>
      {!auth.loading && user === auth.user._id && (
        <button type='button' className='btn btn-danger'>
          <X size={18} style={{ verticalAlign: 'middle' }} />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(PostItem);
