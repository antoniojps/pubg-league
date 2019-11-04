/*
  Use like:
  const { sm, md, lg } = useBreakpoints()
*/

import { useEffect, useState, useMemo } from 'react';
import { size } from 'services/breakpoints';

const useBreakpoints = () => {
  let state = {};
  let setState = () => {};
  if (typeof document !== 'undefined') {
    [state, setState] = useState({
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', () => setState({
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    }));
    return window.removeEventListener('resize', () => setState({
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
    }));
  }, []);

  const sm = useMemo(() => state.windowWidth >= size.sm, [state.windowWidth]);
  const md = useMemo(() => state.windowWidth >= size.md, [state.windowWidth]);
  const lg = useMemo(() => state.windowWidth >= size.lg, [state.windowWidth]);

  return { sm, md, lg };
};

export default useBreakpoints;
