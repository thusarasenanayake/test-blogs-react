import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

interface Props {}

const Home: React.FC<Props> = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="container">
        {location.pathname === '/' ? (
          <h1 className="my-3 ">Welcome to Test Blogs!</h1>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </>
  );
};
export default Home;
