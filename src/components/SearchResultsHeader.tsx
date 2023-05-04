import { WordDetails } from './types';
import { MouseEventHandler } from 'react';
import PronunciationButton from './PronunciationButton';
import UnavailablePronunciationAlert from './UnavailablePronunciationAlert';

interface SearchResultsHeaderProps {
  wordData: WordDetails;
  isPlaying: boolean;
  showAlert: boolean;
  phonetic: string;
  closeAlert: MouseEventHandler<HTMLButtonElement>;
  playPhoneticAudio: MouseEventHandler<HTMLButtonElement>;
}

const SearchResultsHeader = (props: SearchResultsHeaderProps): JSX.Element => {
  const {
    wordData,
    isPlaying,
    showAlert,
    phonetic,
    closeAlert,
    playPhoneticAudio,
  } = props;

  /**
   * Returns a truncated version of a word if it exceeds 12 characters.
   * @param {WordDetails} wordData - The word data object.
   * @param {string} wordData.word - The word to be shortened.
   * @returns {string} The formatted word.
   */
  const handleWordLength = (wordData: WordDetails): string => {
    return wordData.word
      ? wordData.word.length > 12
        ? `${wordData.word.slice(0, 12)}...`
        : wordData.word
      : '';
  };

  return (
    <div className='flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-8 px-4 pb-12 lg:px-8 xl:px-20'>
      <div className='max-w-full break-all text-5xl font-normal sm:text-7xl'>
        {handleWordLength(wordData)} {/* word searched */}
      </div>

      <PronunciationButton
        isPlaying={isPlaying}
        playPhoneticAudio={playPhoneticAudio}
        wordData={wordData}
        phonetic={phonetic}
      />

      {showAlert && <UnavailablePronunciationAlert closeAlert={closeAlert} />}
    </div>
  );
};

export default SearchResultsHeader;
