import React, {PropsWithChildren} from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-900">
      {children}
    </div>
  );
};

export default AuthLayout;