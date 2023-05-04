import 'animate.css';
import FormField from './FormField';
import { WordDetails } from './types';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import RenderStatus from './RenderStatus';
import SearchResultsHeader from './SearchResultsHeader';
import SearchedWordDetails from './SearchedWordDetails';

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
   * Plays the audio associated with the clicked button element and sets the isPlaying state to true for 2 seconds.
   * @param event The mouse event triggered by clicking the button element.
   * @returns {void}
   */
  const playPhoneticAudio: MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const audioUrl = event.currentTarget.getAttribute('data-audio-url');
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
   * Closes the alert that shows when a word pronunciation is unavailable
   * @returns {void}
   */
  const closeAlert: MouseEventHandler<HTMLButtonElement> = (): void => {
    setShowAlert(false);
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

      <RenderStatus status={status} userInput={userInput} />

      {status == 'definition found' && (
        <div className='animate__animated animate__fadeIn mx-auto mt-16 flex w-full flex-col justify-center'>
          {searchResult.map((wordData: WordDetails, index: number) => (
            <div key={index} className='w-full'>
              {index === 0 && (
                <div className='flex w-full flex-col'>
                  <SearchResultsHeader
                    wordData={wordData}
                    isPlaying={isPlaying}
                    playPhoneticAudio={playPhoneticAudio}
                    showAlert={showAlert}
                    closeAlert={closeAlert}
                    phonetic={
                      wordData.phonetics[0]?.audio ??
                      wordData.phonetics[1]?.audio
                    }
                  />

                  <SearchedWordDetails
                    wordData={wordData}
                    handleWordClick={handleWordClick}
                  />
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
