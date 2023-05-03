import 'animate.css';
import FormField from './FormField';
import { WordDetails } from './types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ErrorStatus, LoadingStatus, NotFoundStatus } from './FetchStatus';
import { PlayIcon, CloseIcon, InfoIcon, SpeakerIcon } from './svgComponents';

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
   * Handles the updating of the searchQuery variable when the form field value changes
   * @param {ChangeEvent} event - The form submission event.
   * @returns {void}
   */
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
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

  /**
   * Returns a truncated version of a word if it exceeds 10 characters.
   * @param {WordDetails} wordData - The word data object.
   * @param {string} wordData.word - The word to be shortened.
   * @returns {string} The formatted word.
   */
  const handleWordLength = (wordData: WordDetails): string => {
    return wordData.word
      ? wordData.word.length > 10
        ? `${wordData.word.slice(0, 10)}...`
        : wordData.word
      : '';
  };

  /**
   * Returns a shortened version of a URL if it exceeds 40 characters.
   * @param {WordDetails} wordData - The word data object.
   * @returns {string} The formatted URL.
   */
  const handleUrlLength = (wordData: WordDetails): string => {
    return wordData.sourceUrls
      ? wordData.sourceUrls[0].length > 40
        ? `${wordData.sourceUrls[0].slice(0, 40)}...`
        : wordData.sourceUrls[0]
      : '';
  };

  /**
   * Returns the phonetic text for a word, or a message indicating that the phonetic text is unavailable.
   * @param {WordDetails} wordData - The word data object.
   * @returns The phonetics text.
   */
  const getPhoneticsText = (wordData: WordDetails): string => {
    return wordData.phonetics[0]?.text ?? wordData.phonetics[1]?.text ?? 'N/A';
  };

  // * Returned JSX * //
  return (
    <main className='mb-40 flex-grow'>
      <FormField
        placeholder='Search for a word...'
        value={searchQuery}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      {status == 'fetching' && <LoadingStatus />}

      {status == 'error' && <ErrorStatus />}

      {status == 'no definitions' && <NotFoundStatus userInput={userInput} />}

      {/* start: search result */}
      {status == 'definition found' && (
        <div className='animate__animated animate__fadeIn mx-auto mt-16 flex w-full flex-col justify-center'>
          {searchResult.map((wordData: WordDetails, index: number) => (
            <div key={index} className='w-full'>
              {index === 0 && (
                <div className='flex w-full flex-col'>
                  {/* start: results header */}
                  <div className='flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-8 px-4 pb-12 lg:px-8 xl:px-20'>
                    {/* word searched */}
                    <div className='max-w-full break-all text-5xl font-normal sm:text-7xl'>
                      {handleWordLength(wordData)}
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
                      className='flex w-fit flex-row items-center justify-center gap-4 rounded-full border border-gray-700 border-opacity-50 py-2 px-5 transition-all hover:bg-gray-700 hover:bg-opacity-50 sm:px-14'
                    >
                      <span>
                        {isPlaying ? (
                          // speaker icon while playing
                          <SpeakerIcon />
                        ) : (
                          // play icon
                          <PlayIcon />
                        )}
                      </span>
                      <span>{getPhoneticsText(wordData)}</span>
                    </button>

                    {/* start: alert when word pronunciation is unavailable */}
                    {showAlert && (
                      <div
                        id='alert-4'
                        className='fixed top-4 left-1/2 mb-4 w-11/12  max-w-lg -translate-x-1/2 sm:w-3/4 lg:w-1/2'
                        role='alert'
                      >
                        <div className='animate__animated animate__bounceInDown flex rounded-lg bg-gray-800 p-4 text-blue-400'>
                          <div className='h-5 w-5 flex-shrink-0'>
                            <InfoIcon />
                          </div>
                          <span className='sr-only'>Info</span>
                          <div className='ml-3 text-base font-medium'>
                            Pronunciation not available.
                          </div>
                          <button
                            type='button'
                            className='-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg  bg-gray-800   p-1.5 text-blue-400 hover:bg-gray-700 focus:ring-2 focus:ring-blue-400'
                            onClick={() => setShowAlert(false)}
                          >
                            <span className='sr-only'>Close</span>
                            <div className='h-5 w-5'>
                              <CloseIcon />
                            </div>
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
                            <div className='border-t-0 border-b border-t-gray-700 border-b-gray-400 border-opacity-50 py-4 pl-4 text-left text-xl font-light sm:w-40 sm:border-t sm:border-b-0 sm:pl-0 sm:pr-10 sm:text-right'>
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
                                    <p>
                                      <span className='text-lg font-normal sm:text-xl'>
                                        {index + 1}. {definition.definition}
                                      </span>
                                    </p>
                                    {/* example usage */}
                                    {definition.example && (
                                      <p className='text-base font-light text-gray-400 sm:text-lg'>
                                        “{definition.example}”
                                      </p>
                                    )}
                                    {/* definition specific synonyms and antonyms */}
                                    {definition.synonyms.length > 0 && (
                                      // synonyms //
                                      <div className='mt-2 flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p className='font-light text-gray-400'>
                                          synonyms
                                        </p>
                                        <p>
                                          {definition.synonyms.map(
                                            (synonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
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
                                        </p>
                                      </div>
                                    )}
                                    {definition.antonyms.length > 0 && (
                                      // antonyms //
                                      <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p className='font-light text-gray-400'>
                                          antonyms
                                        </p>
                                        <p>
                                          {definition.antonyms.map(
                                            (antonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
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
                                        </p>
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
                                        <p className='font-light text-gray-400'>
                                          synonyms
                                        </p>
                                        <p>
                                          {meaning.synonyms.map(
                                            (synonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
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
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  {/* antonyms */}
                                  {meaning.antonyms.length > 0 && (
                                    <div>
                                      <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
                                        <p className='font-light text-gray-400'>
                                          antonyms
                                        </p>
                                        <p>
                                          {meaning.antonyms.map(
                                            (antonym, index: number) => (
                                              <span key={index}>
                                                <span
                                                  className='cursor-pointer font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
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
                                        </p>
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
                          <p className='mb-2 text-xl'>Source URL</p>
                          <a
                            href={wordData.sourceUrls[0]}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='break-all font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
                          >
                            {handleUrlLength(wordData)}
                          </a>
                        </div>
                        <div className='border-b-0 border-l border-r border-gray-700 border-opacity-50 p-4 md:border-b'>
                          <p className='mb-2 text-xl'>License</p>
                          <a
                            href={wordData.license.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
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
