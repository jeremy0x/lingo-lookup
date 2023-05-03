import { MouseEventHandler } from 'react';
import { WordDetails } from './types';
import { PlayIcon, SpeakerIcon } from './svgComponents';

interface SearchResultsHeaderProps {
  isPlaying: boolean;
  wordData: WordDetails;
  phonetic: string;
  playPhoneticAudio: MouseEventHandler<HTMLButtonElement>;
}

const PronunciationButton = (props: SearchResultsHeaderProps) => {
  const { wordData, isPlaying, phonetic, playPhoneticAudio } = props;
  /**
   * Returns the phonetic text for a word, or a message indicating that the phonetic text is unavailable.
   * @param {WordDetails} wordData - The word data object.
   * @returns The phonetics text.
   */
  const getPhoneticsText = (wordData: WordDetails): string => {
    return wordData.phonetics[0]?.text ?? wordData.phonetics[1]?.text ?? 'N/A';
  };

  return (
    <button
      type='button'
      onClick={playPhoneticAudio}
      className='flex w-fit flex-row items-center justify-center gap-4 rounded-full border border-gray-700 border-opacity-50 py-2 px-5 transition-all hover:bg-gray-700 hover:bg-opacity-50 sm:px-14'
      data-audio-url={phonetic}
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
  );
};

export default PronunciationButton;
