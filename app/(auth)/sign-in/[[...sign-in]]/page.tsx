import React from 'react';
import {SignIn} from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-900">
      <SignIn />
    </div>
  );
};

export default SignInPage;