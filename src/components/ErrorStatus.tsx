import errorAnimation from '../assets/error-animation.gif';

const ErrorStatus = () => {
  return (
    <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-xl text-gray-400'>
      <img src={errorAnimation} alt='error animation' className='w-36' />
      <p>There was an error...</p>
    </div>
  );
};

export default ErrorStatus;
