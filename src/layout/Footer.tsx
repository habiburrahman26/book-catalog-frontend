import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10 footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by Habibur
          Rahman
        </p>
      </div>
    </footer>
  );
};

export default Footer;
