import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="bg-white py-16 font-serif flex flex-col justify-center items-center grow">
      <div className="w-full max-w-4xl mx-auto px-4 text-center">
        
        {/* Container for 404 and GIF */}

        <div className="mb-2 z-10">
          <h1 className="text-[100px] md:text-[140px] font-black text-gray-900 leading-none select-none">
            404
          </h1>
        </div>

        <div 
          className="h-[400px] bg-center bg-no-repeat flex justify-center items-start pt-100 " 
          style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)' }}
        >
        </div>
        
        {/* Content Box */}
        <div className="-mt-8 relative z-10 bg-white">
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Look like you're lost
          </h3>
          <p className="text-gray-500 text-lg mb-8 font-medium">
            The page you are looking for is not available!
          </p>
          
          {/* Go to Home Button */}
          <Link 
            to="/" 
            className="text-white bg-[#244d3f] hover:opacity-90 px-10 py-4 rounded-xl font-bold transition-all inline-block shadow-lg active:scale-95 uppercase tracking-wider text-sm"
          >
            Go to Home
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NotFound;