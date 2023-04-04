import { MouseEvent, useState } from 'react';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: MouseEvent) => {
    if (searchQuery.trim() == '') return;

    e.preventDefault();
    console.log(searchQuery);
  };

  return (
    <main className='mb-64 flex-grow'>
      <form className='mx-auto w-full max-w-5xl'>
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
