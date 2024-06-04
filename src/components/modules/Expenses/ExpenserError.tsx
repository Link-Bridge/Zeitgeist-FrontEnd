import { ReactNode } from 'react';

type ExpenserErrorProps = {
  children: ReactNode;
};

const ExpenserError = ({ children }: ExpenserErrorProps) => {
  return <p className='text-errorColor mt-2 text-sm'>{children}</p>;
};

export default ExpenserError;
