import React from "react";
import { useTheme } from "next-themes";

interface LustreTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const LustreText: React.FC<LustreTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const { theme } = useTheme();
  const animationStyle = !disabled
    ? {
        animationDuration: `${speed}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationFillMode: "forwards",
      }
    : undefined;

  return theme === "dark" ? (
    <span
      className={`lustre-text ${
        !disabled ? "animate-shine" : ""
      } lustre-dark ${className}`}
      style={animationStyle}>
      {text}
    </span>
  ) : (
    <span
      className={`lustre-text ${
        !disabled ? "animate-shine" : ""
      } lustre-light ${className}`}
      style={animationStyle}>
      {text}
    </span>
  );
};

export default LustreText;
