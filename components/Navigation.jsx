// src/components/Navigation.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle, signOutUser, useAuthState } from '../src/utilities/firebase'; // Adjust the path if necessary

// Sign In Button Component
const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>
    Sign in with Google
  </button>
);

// Sign Out Button Component
const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOutUser}>
    Sign out
  </button>
);

// Authentication Button Component
const AuthButton = () => {
  const [user] = useAuthState(); // Use the custom hook to track the auth state

  return user ? <SignOutButton /> : <SignInButton />;
};

// Helper function to determine active link
const getActiveClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

/**
 * Navigation Component
 */
const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
        CS Courses
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className={getActiveClass} end>
              Home
            </NavLink>
          </li>
          {/* Add more navigation links here if needed */}
        </ul>
        <AuthButton />
      </div>
    </div>
  </nav>
);

export default Navigation;
