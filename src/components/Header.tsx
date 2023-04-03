import 'animate.css';

const Header = () => {

  return (
    <header className='animate__animated animate__fadeIn animate__slow flex flex-col place-items-center text-center mt-16 gap-8'>
      <h1 className='animate__animated animate__swing animate__delay-2s text-5xl font-semibold sm:text-6xl'>LingoLookup</h1>
      <h3 className='text-gray-400 text-lg sm:text-2xl font-light'>
        Explore word definitions, antonyms, synonyms, origins, and pronunciation in seconds! 
      </h3>
    </header>
  );
};

export default Header;
