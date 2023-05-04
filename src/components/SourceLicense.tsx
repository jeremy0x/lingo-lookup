import { WordDetails } from './types';

interface SourceLicenseProps {
  sourceUrl: string;
  licenseDetails: {
    name: string;
    url: string;
  };
}

const SourceLicense = (props: SourceLicenseProps) => {
  const { sourceUrl, licenseDetails } = props;

  /**
   * Returns a shortened version of a URL if it exceeds 40 characters.
   * @param {string} sourceUrl - The url to be shortened.
   * @returns {string} The formatted URL.
   */
  const handleUrlLength = (sourceUrl: string): string => {
    return sourceUrl
      ? sourceUrl.length > 40
        ? `${sourceUrl.slice(0, 40)}...`
        : sourceUrl
      : '';
  };

  return (
    <div className='search-results-right flex flex-col border-b border-gray-700'>
      {/* source url */}
      <div className='border-t-0 border-l border-r border-b border-gray-700 border-opacity-50 p-4 sm:border'>
        <p className='mb-2 text-xl'>Source URL</p>
        <a
          href={sourceUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='break-all font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
        >
          {handleUrlLength(sourceUrl)}
        </a>
      </div>

      {/* license */}
      <div className='border-b-0 border-l border-r border-gray-700 border-opacity-50 p-4 md:border-b'>
        <p className='mb-2 text-xl'>License</p>
        <a
          href={licenseDetails.url}
          target='_blank'
          rel='noopener noreferrer'
          className='font-light text-blue-400 transition-all hover:text-white focus:text-gray-400'
        >
          {licenseDetails.name}
        </a>
      </div>
    </div>
  );
};

export default SourceLicense;
