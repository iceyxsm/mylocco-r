import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const topFunction = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a
      id="back2Top"
      href="#"
      onClick={topFunction}
      className={`top-scroll ${showScroll ? 'd-block' : 'd-none'}`}
      title="Back to top"
    >
      <i className="fa-solid fa-arrow-up d-flex align-items-center justify-content-center h-100"></i>
    </a>
  );
};

export default BackToTop;

