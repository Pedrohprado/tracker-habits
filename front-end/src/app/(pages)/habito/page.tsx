import { ReactNode } from 'react';

const StructPageComp = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex'>
      {/* <Sidebar /> */}
      <main className='flex-1'>{children}</main>
    </div>
  );
};

export default StructPageComp;
