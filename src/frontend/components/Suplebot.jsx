import { useEffect } from 'react';

function Suplebot() {
  useEffect(() => {
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v2.5/inject.js';
    injectScript.async = true;

    injectScript.onload = () => {
      const configScript = document.createElement('script');
      configScript.src = 'https://files.bpcontent.cloud/2025/05/12/17/20250512175626-8AO6D53Z.js';
      configScript.async = true;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(injectScript);

    return () => {
      document.body.removeChild(injectScript);
      const oldConfig = document.querySelector(
        'script[src="https://files.bpcontent.cloud/2025/05/12/17/20250512175626-8AO6D53Z.js"]'
      );
      if (oldConfig) document.body.removeChild(oldConfig);
    };
  }, []);

  return null;
}

export default Suplebot;
