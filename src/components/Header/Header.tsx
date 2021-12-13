import * as React from 'react';
import './header.scss';

const Header = () => {
  return (
    <div className="header">
      <h1 className="header__title">
        <span role="img" aria-label="bread">
          🍞
        </span>{' '}
        ciabatta
      </h1>
    </div>
  );
};

export default Header;
