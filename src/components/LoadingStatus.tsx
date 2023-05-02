import loader from '../assets/animated-search-icon.gif';

const LoadingStatus = () => {
  return (
    <div className='animate__animated animate__fadeIn mt-8 flex items-center justify-center'>
      <img src={loader} alt='loading animation' className='w-64' />
    </div>
  );
};

export default LoadingStatus;
