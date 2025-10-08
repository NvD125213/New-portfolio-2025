"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn-ui/dialog";

interface Testimonial {
  name?: string;
  image?: string;
  description?: string;
  handle?: string;
}

interface AnimatedCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  applyMask?: boolean;
}

const AnimatedCanopy = ({
  children,
  vertical = false,
  repeat = 4,
  pauseOnHover = false,
  reverse = false,
  className,
  applyMask = true,
  ...props
}: AnimatedCanopyProps) => (
  <div
    {...props}
    className={cn(
      "group relative flex w-full overflow-hidden min-h-[8rem] [--duration:10s] [--gap:12px] [gap:var(--gap)]",
      vertical ? "flex-col" : "flex-row",
      className
    )}>
    {Array.from({ length: repeat }).map((_, index) => (
      <div
        key={`item-${index}`}
        className={cn(
          "absolute inset-0 flex [gap:var(--gap)] [will-change:transform]",
          {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            reverse: reverse,
            "animate-canopy-horizontal flex-row": !vertical,
            "animate-canopy-vertical flex-col": vertical,
          }
        )}>
        {children}
      </div>
    ))}
    {applyMask && (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 h-full w-full from-white/50 from-5% via-transparent via-50% to-white/50 to-95% dark:from-gray-800/50 dark:via-transparent dark:to-gray-800/50",
          vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"
        )}
      />
    )}
  </div>
);

const TestimonialCard = ({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className={cn(
          "group mx-2 flex h-30 w-80 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-transparent p-3 transition-all hover:border-blue-400 hover:shadow-[0_0_10px_#60a5fa] dark:hover:border-blue-400",
          className
        )}>
        <div className="flex items-start gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-600">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-full w-full not-prose object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-foreground">
                {testimonial.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {testimonial.handle}
              </span>
            </div>
            <p className="mt-1 line-clamp-3 text-sm text-foreground">
              {testimonial.description}
            </p>
          </div>
        </div>
      </div>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{testimonial.name}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full border"
                />
                <span className="font-bold">{testimonial.handle}</span>
              </div>
              <div>{testimonial.description}</div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const AnimatedTestimonials = ({
  data,
  className,
  cardClassName,
}: {
  data: Testimonial[];
  className?: string;
  cardClassName?: string;
}) => (
  <div className={cn("w-full overflow-x-hidden py-4", className)}>
    {[false, true, false].map((reverse, index) => (
      <AnimatedCanopy
        key={`Canopy-${index}`}
        reverse={reverse}
        className="[--duration:25s]"
        pauseOnHover
        applyMask={false}
        repeat={3}>
        {data.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            className={cardClassName}
          />
        ))}
      </AnimatedCanopy>
    ))}
  </div>
);
