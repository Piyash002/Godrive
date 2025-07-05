// src/components/ThemeToggle.tsx
import { useDarkMode } from "@/hooks/useDarkMode";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className=" px-1 py-1 rounded text-2xl"
    >
      {theme === 'dark' ?<MdOutlineLightMode /> :<MdOutlineDarkMode />}
    </button>
  );
};

export default ThemeToggle;
