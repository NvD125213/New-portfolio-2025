// components/ui/LordIcon.tsx
"use client";

type LordIconProps = {
  src: string;
  trigger?: "hover" | "click" | "loop" | "morph";
  size?: number;
  colors?: string;
};

export default function LordIcon({
  src,
  trigger = "hover",
  size = 24,
  colors = "primary:#121331,secondary:#08a88a",
}: LordIconProps) {
  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={colors}
      style={{ width: size, height: size }}
    />
  );
}
