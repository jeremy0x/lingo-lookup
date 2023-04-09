import 'animate.css';
import { FormEvent, useState } from 'react';
import loader from '../assets/animated-search-icon.gif';
import searchingAnimation from '../assets/searching-animation.gif';
import errorAnimation from '../assets/error-animation.gif';
import speakerIcon from '../assets/speaker-icon.svg';

interface WordDetails {
  title?: string;
  word: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
      example: string;
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  sourceUrls: string[];
  license: {
    name: string;
    url: string;
  };
}

const Main = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDetails[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    if (searchQuery.trim() == '') return;
    event.preventDefault();
    setUserInput(searchQuery);
    getWordDetails(searchQuery);
  };

  async function getWordDetails(searchQuery: string): Promise<void> {
    setStatus('fetching');
    setShowAlert(false);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`
      );
      const wordDetails = await response.json();

      setUserInput(searchQuery);

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

  // function to handle clicking on a synonym or an antonym
  const handleWordClick = async (word: string) => {
    setSearchQuery(word);
    getWordDetails(word);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playPhoneticAudio = (audioUrl: string) => {
    if (!audioUrl) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <main className='mb-3.4 flex-grow'>
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
        <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-center text-base leading-relaxed text-gray-400 sm:text-xl'>
          <p>
            Oops! Looks like we've hit a lexical roadblock. No definition found
            for '{userInput}'.
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
        <div className='animate__animated animate__fadeIn mt-16 flex w-full flex-col items-center justify-center gap-8'>
          {searchResult.map((wordData: WordDetails, index: number) => (
            <>
              {index === 0 && (
                <div key={index} className='flex w-full flex-col gap-3'>
                  <div className='flex flex-row flex-wrap items-center justify-between gap-4 border-b border-gray-600 pb-12'>
                    <div className='text-5xl sm:text-7xl'>{wordData.word}</div>
                    <button
                      onClick={() =>
                        playPhoneticAudio(
                          wordData.phonetics[0]?.audio ??
                            wordData.phonetics[1]?.audio
                        )
                      }
                      className='flex flex-row items-center justify-center gap-4 rounded-2xl border border-gray-600 py-1 px-5 sm:px-10'
                    >
                      <span>
                        <img
                          src={speakerIcon}
                          alt='speaker icon'
                          className='w-5'
                        />
                      </span>
                      <span>
                        {wordData.phonetics[0]?.text ??
                          wordData.phonetics[1]?.text ??
                          'unavailable'}
                      </span>
                    </button>

                    {/* alert to show when word pronunciation is unavailable */}
                    {showAlert && (
                      <div
                        id='alert-4'
                        className='fixed top-4 left-1/2 mb-4 w-11/12  max-w-lg -translate-x-1/2 sm:w-3/4 lg:w-1/2'
                        role='alert'
                      >
                        <div className='animate__animated animate__bounceInDown flex rounded-lg bg-gray-800 p-4 text-blue-400'>
                          <svg
                            className='h-5 w-5 flex-shrink-0'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fill-rule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                              clip-rule='evenodd'
                            ></path>
                          </svg>
                          <span className='sr-only'>Info</span>
                          <div className='ml-3 text-sm font-medium'>
                            Pronunciation unavailable for this word.
                          </div>
                          <button
                            type='button'
                            className='-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg  bg-gray-800   p-1.5 text-blue-400 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400'
                            onClick={() => setShowAlert(false)}
                          >
                            <span className='sr-only'>Close</span>
                            <svg
                              className='h-5 w-5'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fill-rule='evenodd'
                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                clip-rule='evenodd'
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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
                            <p>
                              Synonyms:{' '}
                              {definition.synonyms.map((synonym, index) => (
                                <>
                                  <span
                                    key={index}
                                    className='cursor-pointer text-blue-500'
                                    onClick={() => handleWordClick(synonym)}
                                  >
                                    {synonym}
                                  </span>
                                  <span>, </span>
                                </>
                              ))}
                            </p>
                          )}

                          {/* Antonyms */}
                          {definition.antonyms.length > 0 && (
                            <p>
                              Antonyms:{' '}
                              {definition.antonyms.map((antonym, index) => (
                                <>
                                  <span
                                    key={index}
                                    className='cursor-pointer text-blue-500'
                                    onClick={() => handleWordClick(antonym)}
                                  >
                                    {antonym}
                                  </span>
                                  <span>, </span>
                                </>
                              ))}
                            </p>
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
                          <div className='text-gray-500'>
                            Synonyms:{' '}
                            {meaning.synonyms.map((synonym, index) => (
                              <>
                                <span
                                  key={index}
                                  className='cursor-pointer text-blue-500'
                                  onClick={() => handleWordClick(synonym)}
                                >
                                  {synonym}
                                </span>
                                <span>, </span>
                              </>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Antonyms */}
                      {meaning.antonyms.length > 0 && (
                        <div>
                          <div className='text-gray-500'>
                            Antonyms:{' '}
                            {meaning.antonyms.map((antonym, index) => (
                              <>
                                <span
                                  key={index}
                                  className='cursor-pointer text-blue-500'
                                  onClick={() => handleWordClick(antonym)}
                                >
                                  {antonym}
                                </span>
                                <span>, </span>
                              </>
                            ))}
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
            </>
          ))}
        </div>
      )}
    </main>
  );
};

export default Main;
