import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto py-4 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {currentYear} RFP Tracker. All Rights Reserved.</p>
        <nav className="flex gap-4 sm:gap-6 mt-2 md:mt-0">
          <Link to="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/support" className="hover:text-primary transition-colors">
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;