import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { useState } from 'react';
import { Send, Edit3 } from 'lucide-react';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    try {
      await addPost({ text });
      setText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='flex items-center space-x-3 mb-4'>
          <div className='p-2 bg-primary-100 rounded-lg'>
            <Edit3 className='w-5 h-5 text-primary-600' />
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Share your thoughts
          </h3>
        </div>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <textarea
              name='text'
              rows='4'
              className='form-textarea w-full'
              placeholder="What's on your mind? Share your thoughts, ask questions, or start a discussion..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <div className='mt-2 flex justify-between items-center'>
              <p className='text-sm text-gray-500'>
                {text.length}/1000 characters
              </p>
              <div className='text-sm text-gray-500'>
                {text.length > 1000 && (
                  <span className='text-red-500'>Character limit exceeded</span>
                )}
              </div>
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isSubmitting || !text.trim() || text.length > 1000}
              className='btn btn-primary group'
            >
              {isSubmitting ? (
                <div className='flex items-center'>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                  Posting...
                </div>
              ) : (
                <>
                  <Send className='w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-200' />
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
