interface SynonymsAntonymsProps {
  synonyms: string[];
  antonyms: string[];
  handleWordClick: (word: string) => void;
}

const SynonymsAntonyms = (props: SynonymsAntonymsProps) => {
  const { synonyms, antonyms, handleWordClick } = props;

  /**
   *
   * @param index - The current index.
   * @param length - The length of the list.
   * @returns {(JSX.Element | null)} - A comma as a JSX element if the index is not the last index, otherwise null.
   */
  const renderComma = (index: number, length: number): JSX.Element | null => {
    return index !== length - 1 ? <span>, </span> : null;
  };

  return (
    <>
      {/* synonyms */}
      {synonyms.length > 0 && (
        <div>
          <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
            <p className='font-light text-gray-400'>synonyms</p>
            <p>
              {synonyms.map((synonym, index: number) => (
                <span key={index}>
                  <span
                    className='cursor-pointer font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
                    onClick={() => handleWordClick(synonym)}
                  >
                    {synonym}
                  </span>
                  {renderComma(index, synonyms.length)}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* antonyms */}
      {antonyms.length > 0 && (
        <div>
          <div className='flex flex-col gap-1 sm:flex-row sm:gap-2'>
            <p className='font-light text-gray-400'>antonyms</p>
            <p>
              {antonyms.map((antonym, index: number) => (
                <span key={index}>
                  <span
                    className='cursor-pointer font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
                    onClick={() => handleWordClick(antonym)}
                  >
                    {antonym}
                  </span>
                  {renderComma(index, antonyms.length)}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SynonymsAntonyms;
