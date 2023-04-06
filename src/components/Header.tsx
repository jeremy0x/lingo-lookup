import 'animate.css';

const Header = () => {
  return (
    <header className='animate__animated animate__fadeInUp animate__slow mt-16 mb-10 flex flex-col place-items-center gap-8 text-center'>
      <h1 className='animate__animated animate__swing animate__delay-2s text-5xl font-semibold sm:text-6xl'>
        LingoLookup
      </h1>
      <h3 className='text-lg font-light text-gray-400 sm:text-2xl'>
        Explore word definitions, antonyms, synonyms, origins, and pronunciation
        in seconds!
      </h3>
    </header>
  );
};

export default Header;
