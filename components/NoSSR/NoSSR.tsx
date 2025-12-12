'use client';

import React from 'react';

interface NoSSRProps {
  children?: React.ReactNode;
}

const NoSSR: React.FC<NoSSRProps> = ({ children }) => {
  return <>{children}</>;
};

export default NoSSR;