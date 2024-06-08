// src/pages/LandingPage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


const LandingPage = () => {
    const { isSignedIn } = useUser(); // Adjust based on your auth hook/context
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isSignedIn) {
        navigate('/dashboard');
      }
    }, [isSignedIn, navigate]);
  
  return (
    <div><section className="bg-white-50">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Control Your Finances.
          <strong className="font-extrabold text-primary sm:block"> Don't Let Them Control You. </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
          Balance your budget, and worry less.
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/auth"
          >
            Get Started
          </a>
  
          
        </div>
      </div>
    </div>
  </section></div>
  );
};

export default LandingPage;
