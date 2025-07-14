import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/profiles'); // Navigate back to the previous page
  };

  return (
    <div
      style={{ textAlign: 'center', marginTop: '100px', marginBottom: '100px' }}
    >
      <h1 style={{ fontSize: '3rem', color: '#ff6b6b' }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#555' }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={handleGoBack}
        className='btn btn-primary hover:bg-blue-800'
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '1rem',
          color: '#ffff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
