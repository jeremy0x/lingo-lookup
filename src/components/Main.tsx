import 'animate.css';
import { FormEvent, useState } from 'react';
import loader from '../assets/animated-search-icon.gif';
import searchingAnimation from '../assets/searching-animation.gif';
import errorAnimation from '../assets/error-animation.gif';
import speakerIcon from '../assets/speaker-icon.svg';

/**
  Interface describing the structure of word details returned from a dictionary API.
*/
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

/**
 * A component for searching and displaying dictionary definitions for words.
 * @returns {JSX.Element} The rendered component.
 */
const Main = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [searchResult, setSearchResult] = useState<WordDetails[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  /**
   * Handles the submission of a search query form.
   * @param {FormEvent} event - The form submission event.
   * @returns {void}
   */
  const handleSubmit = (event: FormEvent): void => {
    if (searchQuery.trim() == '') return;
    event.preventDefault();
    setUserInput(searchQuery);
    getWordDetails(searchQuery);
  };

  /**
   * Retrieves word details from a dictionary API for the specified search query.
   * @param {string} searchQuery - The word or phrase to search for.
   * @returns {Promise<void>}
   */
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

  /**
   * Handles a click on a word in the search results.
   * @param {string} word - The word that was clicked.
   * @returns {Promise<void>}
   */
  const handleWordClick = async (word: string): Promise<void> => {
    setSearchQuery(word);
    getWordDetails(word);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Plays a phonetic audio file from the specified URL.
   * @param {string} audioUrl - The URL of the audio file to play.
   * @returns {void}
   */
  const playPhoneticAudio = (audioUrl: string): void => {
    setIsPlaying(true);
    if (!audioUrl) {
      setShowAlert(true);
      setTimeout(() => {
        setIsPlaying(false);
      }, 2000);
      return;
    }
    setShowAlert(false);
    const audio = new Audio(audioUrl);
    audio.play();

    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <main className='mb-40 flex-grow sm:mb-20'>
      {/* start: search form */}
      <form
        className='animate__animated animate__fadeIn mx-auto w-full max-w-5xl px-4'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor='search'
          className='sr-only mb-2 text-sm font-medium text-gray-900'
        >
          Search
        </label>
        <div className='relative'>
          {/* search icon */}
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

          {/* input field */}
          <input
            type='search'
            id='search'
            className='block w-full rounded-lg border border-gray-600 bg-gray-700 py-3 pr-24 pl-10 text-gray-300 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Search for a word...'
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete='off'
          />

          {/* search button */}
          <button
            type='submit'
            className='absolute right-2.5 bottom-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form>
      {/* start: search form */}

      {/* loader */}
      {status == 'fetching' && (
        <div className='animate__animated animate__fadeIn mt-8 flex items-center justify-center'>
          <img src={loader} alt='loading animation' className='w-64' />
        </div>
      )}

      {/* error */}
      {status == 'error' && (
        <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-xl text-gray-400'>
          <img src={errorAnimation} alt='error animation' className='w-36' />
          <p>There was an error...</p>
        </div>
      )}

      {/* invalid search || word definition unavailable */}
      {status == 'no definitions' && (
        <div className='animate__animated animate__fadeIn mt-8 flex flex-col items-center justify-center text-center leading-relaxed text-gray-400 sm:text-xl'>
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

      {/* start: search result */}
      {status == 'definition found' && (
        <div className='animate__animated animate__fadeIn mx-auto mt-16 flex w-full justify-center'>
          {searchResult.map((wordData: WordDetails, index: number) => (
            <div key={index} className='w-auto'>
              {index === 0 && (
                <div className='flex w-full flex-col'>
                  {/* start: results header */}
                  <div className='flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-8 px-4 pb-12 lg:px-8 xl:px-20'>
                    {/* word searched */}
                    <div className='max-w-full break-all text-5xl sm:text-7xl'>
                      {wordData.word.length > 10
                        ? `${wordData.word.slice(0, 10)}...`
                        : wordData.word}
                    </div>

                    {/* pronunciation button */}
                    <button
                      type='button'
                      onClick={() =>
                        playPhoneticAudio(
                          wordData.phonetics[0]?.audio ??
                            wordData.phonetics[1]?.audio
                        )
                      }
                      className='flex w-fit flex-row items-center justify-center gap-4 rounded-full border border-gray-700 border-opacity-50 py-2 px-5 sm:px-14'
                    >
                      <span>
                        {isPlaying ? (
                          // speaker icon while playing
                          <img
                            src={speakerIcon}
                            alt='speaker icon'
                            className='animate__animated animate__fadeIn w-5'
                          />
                        ) : (
                          // play icon
                          <svg
                            className='animate__animated animate__fadeIn w-5'
                            role='img'
                            viewBox='0 0 512 512'
                          >
                            <path
                              fill='currentColor'
                              d='M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z'
                            ></path>
                          </svg>
                        )}
                      </span>
                      <span>
                        {wordData.phonetics[0]?.text ??
                          wordData.phonetics[1]?.text ??
                          'unavailable'}
                      </span>
                    </button>

                    {/* start: alert when word pronunciation is unavailable */}
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
                              fillRule='evenodd'
                              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          <span className='sr-only'>Info</span>
                          <div className='ml-3 text-sm font-medium'>
                            Pronunciation not available.
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
                                fillRule='evenodd'
                                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                clipRule='evenodd'
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* end: results header */}

                  {/* start: word details */}
                  <div className='mx-2 sm:mx-4 lg:mx-8'>
                    <div className='flex flex-col border-r border-l border-b border-t border-gray-500 border-t-gray-400 border-opacity-50 md:flex-row'>
                      <div className='search-results-left'>
                        {wordData.meanings.map((meaning, index: number) => (
                          <div
                            key={index}
                            className='mb-16 flex flex-col border-b border-gray-700 sm:mb-0 sm:flex-row'
                          >
                            {/* part of speech */}
                            <div className='border-t-0 border-b border-t-gray-700 border-b-gray-400 border-opacity-50 py-4 pl-4 text-left sm:w-32 sm:border-t sm:border-b-0 sm:pl-0 sm:pr-10 sm:text-right'>
                              {meaning.partOfSpeech}
                            </div>
                            <div className='w-full'>
                              {meaning.definitions.map(
                                (definition, index: number) => (
                                  <div
                                    key={index}
                                    className='flex flex-col gap-2 border-r border-l border-t border-gray-700 border-opacity-50 p-4'
                                  >
                                    {/* definition */}
                                    <div>
                                      <span className='text-lg sm:text-2xl'>
                                        {index + 1}
                                      </span>
                                      .{' '}
                                      <span className='text-base sm:text-xl'>
                                        {definition.definition}
                                      </span>
                                    </div>
                                    {/* example usage */}
                                    {definition.example && (
                                      <p className='text-gray-500'>
                                        "{definition.example}"
                                      </p>
                                    )}
                                    {/* definition specific synonyms and antonyms */}
                                    {definition.synonyms.length > 0 && (
                                      // synonyms //
                                      <div className='mt-2 flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p className='text-gray-500'>
                                          synonyms
                                        </p>
                                        <div>
                                          {definition.synonyms.map(
                                            (synonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer text-blue-400 transition-all hover:text-white focus:text-gray-500'
                                                  onClick={() =>
                                                    handleWordClick(synonym)
                                                  }
                                                >
                                                  {synonym}
                                                </span>
                                                {index !==
                                                  meaning.synonyms.length -
                                                    1 && <span>, </span>}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    {definition.antonyms.length > 0 && (
                                      // antonyms //
                                      <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p>antonyms</p>
                                        {definition.antonyms.map(
                                          (antonym, index: number) => (
                                            <div key={index}>
                                              <span
                                                className='cursor-pointer text-blue-400 transition-all hover:text-white focus:text-gray-500'
                                                onClick={() =>
                                                  handleWordClick(antonym)
                                                }
                                              >
                                                {antonym}
                                              </span>
                                              {index !==
                                                meaning.antonyms.length - 1 && (
                                                <span>, </span>
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )
                              )}
                              {/* start: part of speech specific synonyms and antonyms */}
                              {(meaning.synonyms.length > 0 ||
                                meaning.antonyms.length > 0) && (
                                <div className='flex w-full flex-col gap-4 border border-b-0 border-r-gray-700 border-l-gray-700 border-t-gray-500 border-opacity-50 p-4'>
                                  {/* synonyms */}
                                  {meaning.synonyms.length > 0 && (
                                    <div>
                                      <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p className='text-gray-500'>
                                          synonyms
                                        </p>
                                        <div>
                                          {meaning.synonyms.map(
                                            (synonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer text-blue-400 transition-all hover:text-white focus:text-gray-500'
                                                  onClick={() =>
                                                    handleWordClick(synonym)
                                                  }
                                                >
                                                  {synonym}
                                                </span>
                                                {index !==
                                                  meaning.synonyms.length -
                                                    1 && <span>, </span>}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {/* antonyms */}
                                  {meaning.antonyms.length > 0 && (
                                    <div>
                                      <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p className='text-gray-500'>
                                          antonyms
                                        </p>
                                        <div>
                                          {meaning.antonyms.map(
                                            (antonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer text-blue-400 transition-all hover:text-white focus:text-gray-500'
                                                  onClick={() =>
                                                    handleWordClick(antonym)
                                                  }
                                                >
                                                  {antonym}
                                                </span>
                                                {index !==
                                                  meaning.antonyms.length -
                                                    1 && <span>, </span>}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                              {/* end: part of speech specific synonyms and antonyms */}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* start: source & license */}
                      <div className='search-results-right flex flex-col border-b border-gray-700'>
                        <div className='border-t-0 border-l border-r border-b border-gray-700 border-opacity-50 p-4 sm:border'>
                          <p className='mb-2'>Source URL</p>
                          <a
                            href={wordData.sourceUrls[0]}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='break-all text-blue-400 transition-all hover:text-white focus:text-gray-500'
                          >
                            {wordData.sourceUrls[0].length > 40
                              ? `${wordData.sourceUrls[0].slice(0, 40)}...`
                              : wordData.sourceUrls[0]}
                          </a>
                        </div>
                        <div className='border-b-0 border-l border-r border-gray-700 border-opacity-50 p-4 md:border-b'>
                          <p className='mb-2'>License</p>
                          <a
                            href={wordData.license.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-400 transition-all hover:text-white focus:text-gray-500'
                          >
                            {wordData.license.name}
                          </a>
                        </div>
                      </div>
                      {/* end: source & license */}
                    </div>
                  </div>
                  {/* end: word details */}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* start: search result */}
    </main>
  );
};

export default Main;
