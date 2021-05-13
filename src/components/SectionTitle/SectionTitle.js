import React from 'react';
import './SectionTitle.css';

function SectionTitle(props) {
  return (
    <h2 className={`section-title ${props.className}`}>{props.title}</h2>
  );
}

export default SectionTitle;
