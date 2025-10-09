import { Calendar } from "lucide-react";
import BadgeCustom from "../ui/badge/my-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn-ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export interface Technology {
  name?: string;
  icon?: string;
  bg?: string;
  classname?: string;
}

export interface Project {
  name?: string;
  image?: string;
  content?: string;
}

export interface Experience {
  title?: string;
  icon_timeline?: any;
  image?: string;
  company?: string;
  period?: string;
  level?: string;
  description?: string | string[];
  technologies?: Technology[];
  projects?: Project[];
}

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const [carouselOffset, setCarouselOffset] = useState<number>(0);
  const scrollRafRef = useRef<number | null>(null);
  const [showRight, setShowRight] = useState<boolean>(false);

  // Dùng Intersection Observer để phát hiện timeline nào trong viewport
  // Giảm giật bằng cách: so sánh trước khi setState và batch bằng rAF
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && index !== activeIndexRef.current) {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            rafIdRef.current = requestAnimationFrame(() => {
              activeIndexRef.current = index;
              setActiveIndex(index);
            });
          }
        });
      },
      { threshold: 0.5, root: null, rootMargin: "0px 0px -30% 0px" }
    );
    itemRefs.current?.forEach((el) => el && observer.observe(el));
    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const active =
    activeIndex >= 0 && activeIndex < experiences.length
      ? experiences[activeIndex]
      : undefined;
  const activeProjects = active?.projects ?? [];

  // Đồng bộ vị trí carousel theo item đang active
  useEffect(() => {
    const updateOffset = () => {
      const activeEl = itemRefs.current[activeIndexRef.current];
      const leftEl = leftColRef.current;
      if (!activeEl || !leftEl) return;
      const leftRect = leftEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const offset = Math.max(0, itemRect.top - leftRect.top);
      setCarouselOffset(offset);
    };

    const onScroll = () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onScroll as any);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [activeIndex]);

  // Hiện/ẩn panel phải theo việc khu vực timeline có đang trong viewport không
  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShowRight(true);
          } else {
            setShowRight(false);
          }
        });
      },
      { threshold: 0.15, root: null, rootMargin: "0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto md:px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Timeline list */}
        <div className="relative" ref={leftColRef}>
          {/* Timeline line */}
          <div className="absolute left-2 md:left-3 top-4 bottom-0 border-l-2" />

          {experiences.map(
            (
              {
                company,
                description,
                period,
                level,
                technologies = [],
                title,
                image,
                icon_timeline,
                projects = [],
              },
              index
            ) => (
              <motion.div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className="relative pl-8 pb-16 last:pb-0 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.3, once: false }}
                transition={{ duration: 0.35, ease: "easeOut" }}>
                {/* Timeline dot */}
                <div className="absolute -translate-x-1/2 left-2 md:left-3 top-2 flex items-center justify-center">
                  {icon_timeline ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border shrink-0 bg-white/20 backdrop-blur-sm ring-4 ring-background">
                      {icon_timeline}
                    </div>
                  ) : (
                    <div className="h-3 w-3 rounded-full border-2 border-primary bg-background ring-8 ring-background" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0 h-10 w-10 bg-accent rounded-full flex items-center justify-center">
                      <Image
                        src={String(image)}
                        alt={`${company ?? "company"} logo`}
                        width={32}
                        height={32}
                        className="h-8 w-8 text-muted-foreground rounded-full object-cover"
                        sizes="32px"
                        priority={false}
                      />
                    </div>
                    <span className="text-base font-medium">{company}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <div className="grid grid-cols-2 md:auto-cols-max md:grid-flow-col md:items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
                      {/* Chiếm full width trên mobile */}
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                        <Calendar className="h-4 w-4 text-primary/80" />
                        <span className="px-3 py-0.5 rounded-full border border-white/20 bg-white/10">
                          {period}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 md:col-span-1 ml-6 md:ml-0">
                        <span className="px-3 py-0.5 rounded-full border border-white/20 bg-white/10 text-center md:text-start col-span-1 justify-self-start md:col-auto">
                          {level}
                        </span>
                        {projects.length > 0 && (
                          <div className="col-span-1 md:hidden justify-self-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="underline underline-offset-2 text-primary hover:opacity-80">
                                  Xem dự án
                                </button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>{company}: Dự án</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                                  {projects.map((p, pIdx) => (
                                    <Card
                                      key={pIdx}
                                      className="overflow-hidden">
                                      <CardHeader className="p-0">
                                        {p.image && (
                                          <Image
                                            src={String(p.image)}
                                            alt={p.name ?? `Project ${pIdx}`}
                                            width={640}
                                            height={320}
                                            className="object-cover w-full h-40"
                                          />
                                        )}
                                      </CardHeader>
                                      <CardContent className="p-3 space-y-1">
                                        <h4 className="font-semibold text-base">
                                          {p.name}
                                        </h4>
                                        {p.content && (
                                          <p className="text-sm text-muted-foreground">
                                            {p.content}
                                          </p>
                                        )}
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                      {/* Level và Xem dự án cùng hàng trên mobile */}
                    </div>
                  </div>

                  {Array.isArray(description) ? (
                    <ul className="list-disc list-outside pl-5 text-sm sm:text-base text-muted-foreground space-y-1">
                      {description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm sm:text-base text-muted-foreground text-pretty">
                      {description}
                    </p>
                  )}

                  {/* Badge công nghệ */}
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                      <BadgeCustom
                        key={String(tech.name) + "-" + i}
                        icon={tech.icon}
                        name={String(tech.name)}
                        bg={tech.bg}
                        classname={tech.classname}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Right: Carousel for active item (ẩn trên mobile) */}
        <div className="min-h-[240px] hidden md:block md:sticky md:top-20">
          <AnimatePresence mode="wait">
            {showRight && activeProjects.length > 0 ? (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                ref={rightColRef}>
                <div style={{ height: `${carouselOffset}px` }} />
                <Carousel className="w-full max-w-none">
                  <CarouselContent>
                    {activeProjects.map((item, idx) => (
                      <CarouselItem key={idx}>
                        <div className="p-1 h-96 md:h-[26rem]">
                          <Card
                            className="h-full flex flex-col overflow-hidden
                              bg-gradient-to-br from-gray-50 to-gray-100 
                              dark:from-[#0b0b0c] dark:to-[#1b1b1f]
                              border border-gray-200 dark:border-gray-700/60 
                              ring-1 ring-gray-300/40 dark:ring-gray-600/30
                              shadow-sm hover:shadow-lg hover:-translate-y-[2px]
                              transition-all duration-200 rounded-xl">
                            <CardHeader className="p-0 shrink-0">
                              <Image
                                src={String(item?.image)}
                                alt={item?.name ?? `Project ${idx}`}
                                width={640}
                                height={320}
                                className="object-cover w-full h-36 md:h-40"
                                sizes="(max-width: 768px) 100vw, 480px"
                                priority={idx === 0}
                              />
                            </CardHeader>

                            <CardContent className="p-3 pt-3 space-y-2 flex-1 overflow-auto">
                              <h3 className="text-base md:text-lg font-semibold tracking-tight line-clamp-2">
                                {item?.name}
                              </h3>
                              {item?.content && (
                                <p className="text-sm md:text-[15px] text-muted-foreground line-clamp-5">
                                  {item?.content}
                                </p>
                              )}
                            </CardContent>

                            <CardFooter className="p-3 pt-0 mt-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full group flex items-center justify-center gap-1 text-sm font-medium 
                                border border-gray-300 dark:border-gray-600 
                                bg-transparent text-gray-800 dark:text-gray-200
                                hover:bg-gray-100 dark:hover:bg-gray-800 
                                hover:border-gray-400 dark:hover:border-gray-500
                                hover:text-black dark:hover:text-white
                                transition-all duration-200">
                                Xem chi tiết
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </motion.div>
            ) : showRight ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm text-muted-foreground">
                Không có dự án để hiển thị
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
