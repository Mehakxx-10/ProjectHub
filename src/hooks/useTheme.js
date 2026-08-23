import { useState } from 'react';

export function useTheme() {
  const [theme] = useState('cream');

  const toggleTheme = () => {};
  const setTheme = () => {};

  return { theme, toggleTheme, setTheme };
}
