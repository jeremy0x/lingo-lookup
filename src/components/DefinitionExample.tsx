interface DefinitionExamplesProps {
  definition: string;
  exampleUsage: string;
  index: number;
}

const DefinitionExample = (props: DefinitionExamplesProps) => {
  const { definition, exampleUsage, index } = props;

  return (
    <>
      {/* definition */}
      <p>
        <span className='text-lg font-normal sm:text-xl'>
          {index + 1}. {definition}
        </span>
      </p>

      {/* example usage */}
      {exampleUsage && (
        <p className='text-base font-light text-gray-400 sm:text-lg'>
          “{exampleUsage}”
        </p>
      )}
    </>
  );
};

export default DefinitionExample;
