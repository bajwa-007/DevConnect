import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading = true, size = 50, color = '#36d7b7' }) => (
  <section className='container'>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
      }}
    >
      <ClipLoader loading={loading} size={size} color={color} />
    </div>
  </section>
);

export default Spinner;
