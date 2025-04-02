import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-base-300 p-4 shadow-md flex justify-center">
      <p className="text-sm">
        © {new Date().getFullYear()} All rights reserved | HEALTHCARE
      </p>
    </footer>
  );
};

export default Footer;
