import { MouseEventHandler } from 'react';
import { CloseIcon, InfoIcon } from './svgComponents';

interface UnavailablePronunciationAlertProps {
  closeAlert: MouseEventHandler<HTMLButtonElement>;
}

const UnavailablePronunciationAlert = ({
  closeAlert,
}: UnavailablePronunciationAlertProps) => {
  return (
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
          onClick={closeAlert}
        >
          <span className='sr-only'>Close</span>
          <div className='h-5 w-5'>
            <CloseIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default UnavailablePronunciationAlert;
