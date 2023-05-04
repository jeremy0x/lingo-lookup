import { MouseEventHandler } from 'react';
import { WordDetails } from './types';
import SynonymsAntonyms from './SynonymsAntonyms';
import SourceLicense from './SourceLicense';
import DefinitionExample from './DefinitionExample';

interface SearchedWordDetailsProps {
  wordData: WordDetails;
  handleWordClick: (word: string) => void;
}

const SearchedWordDetails = (props: SearchedWordDetailsProps) => {
  const { wordData, handleWordClick } = props;

  return (
    <div className='mx-2 sm:mx-4 lg:mx-8'>
      <div className='flex flex-col border-r border-l border-b border-t border-gray-500 border-t-gray-400 border-opacity-50 md:flex-row'>
        <div className='search-results-left'>
          {wordData.meanings.map((meaning, index: number) => (
            <div
              key={index}
              className='mb-16 flex flex-col border-b border-gray-700 sm:mb-0 sm:flex-row'
            >
              <div className='border-t-0 border-b border-t-gray-700 border-b-gray-400 border-opacity-50 py-4 pl-4 text-left text-xl font-light sm:w-40 sm:border-t sm:border-b-0 sm:pl-0 sm:pr-10 sm:text-right'>
                {meaning.partOfSpeech} {/* part of speech */}
              </div>

              <div className='w-full'>
                {meaning.definitions.map((definition, index: number) => (
                  <div
                    key={index}
                    className='flex flex-col gap-2 border-r border-l border-t border-gray-700 border-opacity-50 p-4'
                  >
                    <DefinitionExample
                      definition={definition.definition}
                      exampleUsage={definition.example}
                      index={index}
                    />

                    {/* definition specific synonyms and antonyms */}
                    {(definition.synonyms.length > 0 ||
                      definition.antonyms.length > 0) && (
                      <SynonymsAntonyms
                        synonyms={definition.synonyms}
                        antonyms={definition.antonyms}
                        handleWordClick={handleWordClick}
                      />
                    )}
                  </div>
                ))}

                {/* part of speech specific synonyms and antonyms */}
                {(meaning.synonyms.length > 0 ||
                  meaning.antonyms.length > 0) && (
                  <div className='flex w-full flex-col gap-4 border border-b-0 border-r-gray-700 border-l-gray-700 border-t-gray-500 border-opacity-50 p-4'>
                    <SynonymsAntonyms
                      synonyms={meaning.synonyms}
                      antonyms={meaning.antonyms}
                      handleWordClick={handleWordClick}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <SourceLicense
          sourceUrl={wordData.sourceUrls[0]}
          licenseDetails={wordData.license}
        />
      </div>
    </div>
  );
};

export default SearchedWordDetails;
