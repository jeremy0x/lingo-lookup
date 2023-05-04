import { ErrorStatus, LoadingStatus, NotFoundStatus } from './FetchStatus';

interface RenderStatusProps {
  status: string;
  userInput: string;
}

const RenderStatus = (props: RenderStatusProps) => {
  const { status, userInput } = props;
  return (
    <>
      {status == 'fetching' && <LoadingStatus />}
      {status == 'error' && <ErrorStatus />}
      {status == 'no definitions' && <NotFoundStatus userInput={userInput} />}
    </>
  );
};

export default RenderStatus;
