import { Loader2 } from 'lucide-react';

const Spinner = ({
  loading = true,
  size = 'md',
  className = '',
  text = 'Loading...',
}) => {
  if (!loading) return null;

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}
    >
      <Loader2
        className={`${sizeClasses[size]} text-primary-600 animate-spin`}
      />
      {text && (
        <p className='mt-4 text-sm text-gray-500 animate-pulse'>{text}</p>
      )}
    </div>
  );
};

export default Spinner;
