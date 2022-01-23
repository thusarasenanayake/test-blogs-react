import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {}

const NavBar: React.FC<Props> = () => {
  return (
    <>
      <header>
        <div className="container text-center py-2">
          <h1>
            <NavLink to="/" className="text-primary ">
              Test Blogs
            </NavLink>
          </h1>
        </div>
      </header>
      <nav className="bg-light ">
        <div className="container d-flex justify-content-center ">
          <NavLink
            className={({ isActive }) =>
              !isActive
                ? 'text-dark px-2 '
                : 'text-danger px-2 text-decoration-none'
            }
            to="/world"
          >
            World
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              !isActive
                ? 'text-dark px-2 '
                : 'text-danger px-2 text-decoration-none'
            }
            to="/technology"
          >
            Technology
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
