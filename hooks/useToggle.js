/*
  This hook encapsulates a toggle logic
  Used like - const [isOpen, toggle] = useToggle()
*/

import { useState } from 'react';

function useToggle() {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  return [isOpen, toggle];
}

export default useToggle;
