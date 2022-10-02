// EXTERNAL IMPORTS
import { useEffect } from 'react';

// SHARED IMPORTS
import { enforceHttps } from '@utils';

// Hook
const useEnforceHttps = () => {
  useEffect(() => {
    enforceHttps();
  }, []);
};

export default useEnforceHttps;
