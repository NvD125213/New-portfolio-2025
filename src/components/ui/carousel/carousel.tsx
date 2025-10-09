import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

interface CarouselContentProps {
  children?: React.ReactNode;
}

interface CarouselItemProps {
  children?: React.ReactNode;
}

interface CarouselControlProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export const CarouselContent: React.FC<CarouselContentProps> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const totalCards = childrenArray.length;
  const maxVisible = 3;

  const goNext = () => {
    if (activeIndex < totalCards - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const goPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="relative" style={{ height: "420px" }}>
        {childrenArray.map((child, index) => {
          const position = index - activeIndex;
          const isVisible = position >= 0 && position < maxVisible;

          return (
            <div
              key={index}
              className="absolute w-full transition-all duration-200 ease-out"
              style={{
                zIndex: isVisible ? maxVisible - position : -1,
                top: isVisible ? `${position * 18}px` : `${maxVisible * 18}px`,
                opacity: isVisible ? 1 - position * 0.15 : 0,
                transform: isVisible
                  ? `scale(${1 - position * 0.03})`
                  : "scale(0.9)",
                pointerEvents: position === 0 ? "auto" : "none",
                visibility: isVisible ? "visible" : "hidden",
              }}>
              {child}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-4">
        <CarouselPrevious onClick={goPrevious} disabled={activeIndex === 0} />

        <CarouselNext
          onClick={goNext}
          disabled={activeIndex >= totalCards - 1}
        />
      </div>
    </div>
  );
};
export const CarouselItem: React.FC<CarouselItemProps> = ({ children }) => {
  return <>{children}</>;
};

export const CarouselPrevious: React.FC<CarouselControlProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      size="icon"
      className="rounded-full mt-3 h-8 w-8">
      <ChevronUp className="h-4 w-4" />
      <span className="sr-only">Previous card</span>
    </Button>
  );
};

export const CarouselNext: React.FC<CarouselControlProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="outline"
      size="icon"
      className="rounded-full mt-3 h-8 w-8">
      <ChevronDown className="h-4 w-4" />
      <span className="sr-only">Next card</span>
    </Button>
  );
};
