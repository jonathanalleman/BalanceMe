import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import BalanceMe from "../assets/BalanceMe.svg";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
          <img src={BalanceMe} alt="Logo" className="h-16 mr-2" />
          BalanceMe
        </Link>
        {isSignedIn && (
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/stocks" className="text-gray-700 hover:text-gray-900">
              Stocks
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.firstName}</span>
              <UserButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
