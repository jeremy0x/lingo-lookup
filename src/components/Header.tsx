import 'animate.css';

const Header = () => {
  return (
    <header className='mt-16 mb-10 flex flex-col place-items-center gap-4 text-center'>
      <h1 className='animate__animated animate__bounceInDown max-w-full overflow-hidden truncate whitespace-nowrap bg-gradient-to-r from-blue-600 to-white bg-clip-text px-4 pb-4 text-5xl font-extrabold text-transparent sm:text-6xl xl:text-7xl'>
        LingoLookup
      </h1>

      <h3 className='animate__animated animate__fadeIn px-4 text-lg font-light text-gray-400 sm:text-2xl'>
        Explore word definitions, antonyms, synonyms, origins, and pronunciation
        in seconds!
      </h3>
    </header>
  );
};

export default Header;
