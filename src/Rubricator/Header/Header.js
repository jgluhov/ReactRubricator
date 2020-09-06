import React from 'react';
import './Header.scss';

export const RubricatorHeader = ({ header, onClick }) => {
  const className = [
    'Rubricator__Header',
    header.expanded ? 'Rubricator__Header--expanded' : ''
  ].join(' ');

  return (
    <div className={className} onClick={onClick}>
      I'm Header
    </div>
  );
}
