import { SearchIcon } from './svgComponents';

interface FormFieldProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormField = (props: FormFieldProps): JSX.Element => {
  const { placeholder, value, onChange, onSubmit } = props;
  return (
    <form
      className='animate__animated animate__fadeIn mx-auto w-full max-w-5xl px-4'
      onSubmit={onSubmit}
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
          <SearchIcon />
        </div>

        {/* input field */}
        <input
          type='search'
          id='search'
          className='block w-full rounded-lg border border-gray-600 bg-gray-700 py-3 pr-24 pl-10 text-gray-300 placeholder-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          autoComplete='off'
        />

        {/* search button */}
        <button
          type='submit'
          className='absolute right-2.5 bottom-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-800'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default FormField;
