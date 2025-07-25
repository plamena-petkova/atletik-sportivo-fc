'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  lng: string;
}

export default function I18nProvider({ children, lng }: I18nProviderProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lng).then(() => setReady(true));
  }, [lng]);

  // Wait until i18n is ready to render children to avoid flicker
  if (!ready) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: 'auto', background: 'none', display: 'block' }}
        width="50px"
        height="50px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          strokeWidth="8"
          stroke="#555"
          strokeDasharray="50.26548245743669 50.26548245743669"
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          />
        </circle>
      </svg>
    </div>
  );
}


  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
