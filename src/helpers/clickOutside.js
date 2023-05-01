import { useEffect } from 'react';

export default function useClickOutside(ref, callback) {
  useEffect(() => {
    const listener = (eve) => {
      // the element doesn't exist or click inside the element
      if (!ref.current || ref.current.contains(eve.target)) {
        return;
      }
      callback();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
}
