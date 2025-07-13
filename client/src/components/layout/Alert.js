import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ alerts }) => {
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      alerts.forEach((alert) => {
        const toastOptions = {
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            padding: '16px',
          },
        };

        const getIcon = (type) => {
          switch (type) {
            case 'success':
              return <CheckCircle className='w-5 h-5 text-green-500' />;
            case 'danger':
              return <XCircle className='w-5 h-5 text-red-500' />;
            case 'warning':
              return <AlertCircle className='w-5 h-5 text-yellow-500' />;
            default:
              return <Info className='w-5 h-5 text-blue-500' />;
          }
        };

        const customToast = (message, type) => {
          return (
            <div className='flex items-center space-x-3'>
              {getIcon(type)}
              <span className='font-medium'>{message}</span>
            </div>
          );
        };

        switch (alert.alertType) {
          case 'success':
            toast.success(customToast(alert.msg, 'success'), toastOptions);
            break;
          case 'danger':
            toast.error(customToast(alert.msg, 'danger'), toastOptions);
            break;
          case 'warning':
            toast(customToast(alert.msg, 'warning'), {
              ...toastOptions,
              icon: '⚠️',
            });
            break;
          default:
            toast(customToast(alert.msg, 'info'), {
              ...toastOptions,
              icon: 'ℹ️',
            });
        }
      });
    }
  }, [alerts]);

  // Return null since we're using toast notifications instead of inline alerts
  return null;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
