import 'animate.css';
import { FormEvent, useState } from 'react';
import loader from '../assets/animated-search-icon.gif';
import searchingAnimation from '../assets/searching-animation.gif';
import errorAnimation from '../assets/error-animation.gif';
import speakerIcon from '../assets/speaker-icon.svg';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSubmit = (event: FormEvent) => {
    if (searchQuery.trim() == '') return;
    event.preventDefault();
    setUserInput(searchQuery);
    getWordDetails();
  };

  async function getWordDetails(): Promise<void> {
    setStatus('fetching');
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`
      );
      const wordDetails = await response.json();

      if (wordDetails.title) {
        setStatus('no definitions');
      } else {
        setStatus('definition found');
        setSearchResult(wordDetails);
      }
    } catch (error) {
      setStatus('error');
      console.error(error);
    }
  }

  const pronounce = (audioFile) => {
    try {
      const audio = new Audio(audioFile);
      audio.currentTime = 0;
      audio.play();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='mb-32 flex-grow'>
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
            className='block w-full rounded-lg border border-gray-600 bg-gray-700 p-3 pl-10 text-base text-gray-300 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Search for a word...'
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete='off'
          />
          <button
            type='submit'
            className='absolute right-2.5 bottom-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form>

      {/* loader */}
      {status == 'fetching' && (
        <div className='animate__animated animate__fadeIn mt-8 flex items-center justify-center'>
          <img src={loader} alt='loading animation' className='w-64' />
        </div>
      )}

      {/* error message */}
      {status == 'error' && (
        <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-xl text-gray-400'>
          <img src={errorAnimation} alt='error animation' className='w-36' />
          <p>There was an error...</p>
        </div>
      )}

      {/* invalid search */}
      {status == 'no definitions' && (
        <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-base leading-relaxed text-gray-400 sm:text-xl'>
          <p>Sorry pal, we couldn't find definitions for '{userInput}'.</p>
          <p>
            You can try the search again at later time or head to the web
            instead.
          </p>
          <img
            src={searchingAnimation}
            alt='searching animation'
            className='-mt-10 w-96'
          />
        </div>
      )}

      {/* display results */}
      {status == 'definition found' && (
        <div className='animate__animated animate__fadeIn mt-8 flex w-full flex-col items-center justify-center gap-8'>
          {searchResult.map((wordData, index) => (
            <div key={index}>
              {index === 0 && (
                <div className='flex flex-col gap-3'>
                  <div>Word Searched - {wordData.word}</div>

                  <button
                    onClick={() =>
                      wordData.phonetics[0].audio
                        ? playAudio(wordData.phonetics[0].audio)
                        : playAudio(wordData.phonetics[1].audio)
                    }
                  >
                    <span>
                      <img src={speakerIcon} alt='speaker icon' />
                    </span>
                    <span className='pl-2'>
                      {wordData.phonetics[0] && wordData.phonetics[0].text
                        ? wordData.phonetics[0].text
                        : wordData.phonetics[1] && wordData.phonetics[1].text
                        ? wordData.phonetics[1].text
                        : '?'}
                    </span>
                  </button>

                  {wordData.meanings.map((meaning, index) => (
                    <div
                      key={index}
                      className='my-8 flex flex-col items-start justify-start'
                    >
                      {/* part of speech */}
                      <div>Part of speech - {meaning.partOfSpeech}</div>
                      {meaning.definitions.map((definition, index) => (
                        // Definition
                        <div key={index} className='my-4'>
                          <div>
                            {index + 1}. {definition.definition}
                          </div>

                          {/* Synonyms */}
                          {definition.synonyms.length > 0 && (
                            <p>Synonyms: {definition.synonyms.join(', ')}</p>
                          )}

                          {/* Antonyms */}
                          {definition.antonyms.length > 0 && (
                            <p>Antonyms: {definition.antonyms.join(', ')}</p>
                          )}

                          {/* Example */}
                          {definition.example && (
                            <p className='text-gray-500'>
                              "{definition.example}"
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Synonyms */}
                      {meaning.synonyms.length > 0 && (
                        <div>
                          Synonyms -{' '}
                          <div className='text-gray-500'>
                            {meaning.synonyms.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div>Source URL - {wordData.sourceUrls[0]}</div>
                  <div>
                    License:{' '}
                    <a
                      href={wordData.license.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {wordData.license.name}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Main;
