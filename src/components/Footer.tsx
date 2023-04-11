import 'animate.css';

const Footer = () => {
  return (
    <footer className='animate__animated animate__fadeIn animate__faster absolute bottom-0 left-0 w-full border-t border-gray-700 border-opacity-50 transition-all'>
      <div className='container mx-auto'>
        <div className='mx-2 sm:mx-4 lg:mx-8'>
          {/* <hr className='mb-6 border-gray-700 sm:mx-auto lg:mb-8' /> */}
          <div className='p-4 sm:flex sm:items-center sm:justify-between sm:px-6 sm:pb-6'>
            <span className='flex flex-wrap justify-center gap-1 text-center text-base text-gray-400'>
              © 2023 LingoLookup™. Powered by the{' '}
              <a
                href='https://dictionaryapi.dev'
                target='_blank'
                rel='noopener'
                className='text-inherit underline transition-all hover:text-white hover:no-underline'
              >
                Free Dictionary API
              </a>
            </span>
            {/* Social Icons */}
            <div className='mt-6 flex place-items-center justify-center space-x-6 sm:mt-0'>
              <a
                href='https://github.com/jeremy0x/lingo-lookup/'
                target='_blank'
                rel='noopener'
                className='text-gray-500 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white'
                title='Star on GitHub ⭐'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='sr-only'>GitHub repository</span>
              </a>
              <a
                href='https://jeremy0x.hashnode.dev/'
                target='_blank'
                rel='noopener'
                className='text-gray-500 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-blue-700'
                title='View Hashnode Blog'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='m22.351 8.019-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z'></path>
                </svg>
                <span className='sr-only'>Hashnode blog</span>
              </a>
              <a
                href='https://twitter.com/jeremy0x_/'
                target='_blank'
                rel='noopener'
                className='text-gray-500 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-blue-400'
                title='Go to Twitter Profile'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
                <span className='sr-only'>Twitter page</span>
              </a>
              <a
                href='https://linkedin.com/in/jeremy0x/'
                target='_blank'
                rel='noopener'
                className='text-gray-500 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-blue-500'
                title='Connect on LinkedIn'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 93.06 93.06'
                >
                  <path d='M11.185,0.08C5.004,0.08,0.001,5.092,0,11.259c0,6.173,5.003,11.184,11.186,11.184c6.166,0,11.176-5.011,11.176-11.184C22.362,5.091,17.351,0.08,11.185,0.08z' />
                  <rect x='1.538' y='30.926' width='19.287' height='62.054' />
                  <path d='M69.925,29.383c-9.382,0-15.673,5.144-18.248,10.022h-0.258v-8.479H32.921H32.92v62.053h19.27V62.281c0-8.093,1.541-15.932,11.575-15.932c9.89,0,10.022,9.256,10.022,16.451v30.178H93.06V58.942C93.06,42.235,89.455,29.383,69.925,29.383z' />
                </svg>
                <span className='sr-only'>LinkedIn profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
