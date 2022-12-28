import React from 'react';

const SrOnly = ({ text }: { text: string }) => (
  <span className="sr-only">{text}</span>
);

export default SrOnly;
