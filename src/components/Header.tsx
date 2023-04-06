import 'animate.css';

const Header = () => {
  return (
    <header className='mt-16 mb-10 flex flex-col place-items-center gap-8 text-center'>
      <h1 className='animate__animated animate__bounceInDown text-5xl font-semibold sm:text-6xl'>
        LingoLookup
      </h1>
      <h3 className='animate__animated animate__fadeIn text-lg font-light text-gray-400 sm:text-2xl'>
        Explore word definitions, antonyms, synonyms, origins, and pronunciation
        in seconds!
      </h3>
    </header>
  );
};

export default Header;
