import searchingAnimation from '../assets/searching-animation.gif';

const NotFoundStatus = ({ userInput }: { userInput: string }): JSX.Element => {
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

export default NotFoundStatus;
