// SHARED IMPORTS
import { CONFIG } from '@constants';

const enforceHttps = () => {
  if (CONFIG.NODE_ENV !== 'development' && window.location.protocol !== 'https:') {
    window.location.replace(
      `https:${window.location.href.substring(window.location.protocol.length)}`
    );
  }
};

export default enforceHttps;
