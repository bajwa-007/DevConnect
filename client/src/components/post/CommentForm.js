import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { MessageSquare, Send } from 'lucide-react';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-primary-100 rounded-lg'>
            <MessageSquare className='w-5 h-5 text-primary-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Leave a Comment
          </h3>
        </div>
      </div>
      <div className='card-body'>
        <form onSubmit={(e) => onSubmit(e)} className='space-y-4'>
          <div className='form-group'>
            <textarea
              name='text'
              rows={4}
              placeholder='Share your thoughts on this post...'
              value={text}
              onChange={(e) => setText(e.target.value)}
              className='form-textarea'
              required
            />
            <div className='flex justify-between items-center mt-2'>
              <p className='text-sm text-gray-500'>
                {text.length}/500 characters
              </p>
              <p className='text-xs text-gray-400'>
                Be respectful and constructive
              </p>
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={!text.trim()}
              className='btn btn-primary inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Send className='w-4 h-4' />
              <span>Post Comment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
