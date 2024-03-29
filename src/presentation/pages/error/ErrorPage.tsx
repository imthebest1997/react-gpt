import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error: unknown  = useRouteError();
  console.log({error});
  return (
    <div
      id='error-page'
      className='flex flex-col gap-8 justify-center items-center h-screen'
    >
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-slate-400'>
        <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
          Error 404
        </i>
      </p>
    </div>
  );
}
