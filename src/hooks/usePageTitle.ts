import { useEffect } from 'react';
import { useLayoutStore } from '../store/useLayoutStore';

export const usePageTitle = (title: string) => {
  const setTitle = useLayoutStore((state) => state.setTitle);

  useEffect(() => {
    setTitle(title);

    // cleanup function
    return () => setTitle('대시보드');
  }, [title, setTitle]);
};
