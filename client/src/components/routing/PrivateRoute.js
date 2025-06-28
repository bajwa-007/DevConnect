import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, loading, children }) => {
  if (loading) return null; // or a spinner

  return isAuthenticated ? children : <Navigate to='/login' />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
