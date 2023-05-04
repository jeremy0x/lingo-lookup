import loader from '../assets/animated-search-icon.gif';
import errorAnimation from '../assets/error-animation.gif';
import searchingAnimation from '../assets/searching-animation.gif';

export const ErrorStatus = () => {
  return (
    <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-xl text-gray-400'>
      <img src={errorAnimation} alt='error animation' className='w-36' />
      <p>There was an error...</p>
    </div>
  );
};

export const LoadingStatus = () => {
  return (
    <div className='animate__animated animate__fadeIn mt-8 flex items-center justify-center'>
      <img src={loader} alt='loading animation' className='w-64' />
    </div>
  );
};

export const NotFoundStatus = ({
  userInput,
}: {
  userInput: string;
}): JSX.Element => {
  return (
    <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-center leading-relaxed text-gray-400 sm:text-xl'>
      <p>
        Oops! Looks like we've hit a lexical roadblock. No definition found for
        '{userInput}'.
      </p>

      <img
        src={searchingAnimation}
        alt='searching animation'
        className='-mt-10 w-96'
      />
    </div>
  );
};
