import 'animate.css';
import { FormEvent, useState } from 'react';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = (event: FormEvent) => {
    if (searchQuery.trim() == '') return;
    event.preventDefault();
    setUserInput(searchQuery);
    getWordDetails(searchQuery);
  };

  async function getWordDetails(searchQuery: string): Promise<void> {
    setStatus('fetching');
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`
      );
      const wordDetails = await response.json();

      if (wordDetails.length > 0) {
        console.log(wordDetails[0].word);

        if (wordDetails[0].title) {
          setStatus('no definitions');
        } else {
          setStatus('definition found');
          setSearchResult(wordDetails[0]);
        }
      } else {
        setStatus('no definitions');
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  }

  return (
    <main className='mb-20 flex-grow'>
      {/* search form */}
      <form
        className='animate__animated animate__fadeIn mx-auto w-full max-w-5xl'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor='search'
          className='sr-only mb-2 text-sm font-medium text-gray-900'
        >
          Search
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='search'
            className='block w-full rounded-lg border border-gray-600 bg-gray-700 p-4 pl-10 text-base text-gray-300 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='What word would you like to know more about? Look it up here...'
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type='submit'
            className='absolute right-2.5 bottom-2.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
    </main>
  );
};

export default Main;
