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
  DialogDescription,
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
// Lazy load CardJob để tối ưu hiệu suất
const CardJob = dynamic(() => import("../ui/card-info/card-job"), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
  ssr: false,
});
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

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

export interface DetalProject extends Project {
  timesize: number;
  technology: Technology;
  scope: string;
  timeline: string;
  feature: [];
}

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openCardJob, setOpenCardJob] = useState(false);
  const [detailJob, setDetailJob] = useState<DetalProject | null>(null);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const [carouselOffset, setCarouselOffset] = useState<number>(0);
  const scrollRafRef = useRef<number | null>(null);
  const [showRight, setShowRight] = useState<boolean>(false);

  // Tối ưu với useCallback để tránh re-render không cần thiết
  const handleOpenCardJob = useCallback((data: any) => {
    setDetailJob(data);
    setOpenCardJob(true);
  }, []);

  // Preload dữ liệu khi hover để tăng tốc độ mở dialog
  const handlePreloadData = useCallback(() => {
    // Preload component để tăng tốc độ mở dialog
    import("../ui/card-info/card-job");
  }, []);

  const handleClearPreload = useCallback(() => {
    // Clear preload nếu cần
  }, []);

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
      const rightEl = rightColRef.current;
      if (!activeEl || !rightEl) return;

      const activeRect = activeEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      // Tính toán offset để căn giữa carousel với timeline item
      const itemCenter = activeRect.top + activeRect.height / 2;
      const rightCenter = rightRect.top + rightRect.height / 2;

      // Offset để căn giữa carousel với timeline item
      // Giới hạn offset để không vượt quá bounds
      const maxOffset = Math.max(
        0,
        activeProjects.length * 400 - rightRect.height
      );
      const offset = Math.max(0, Math.min(itemCenter - rightCenter, maxOffset));

      setCarouselOffset(offset);
    };

    const onScroll = () => {
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = requestAnimationFrame(updateOffset);
    };

    // Delay để đảm bảo DOM đã render xong
    const timeoutId = setTimeout(updateOffset, 100);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("resize", onScroll as any);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [activeIndex, activeProjects.length]);

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
    <div className="max-w-7xl mx-auto md:px-4 sm:px-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left: Timeline list */}
        <div className="relative pb-20" ref={leftColRef}>
          {/* Timeline line */}
          <div className="absolute left-2 md:left-3 top-4 bottom-0 border-l-2 h-[93%]" />

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
                    <div className="grid grid-cols-2 md:auto-cols-max md:grid-flow-col md:flex md:items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
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
        <div className="hidden md:block md:sticky md:top-20">
          <div ref={rightColRef} className="relative">
            <AnimatePresence mode="wait">
              {showRight && activeProjects.length > 0 ? (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-0 left-0 right-0"
                  style={{
                    transform: `translateY(${carouselOffset}px)`,
                  }}>
                  <div className="w-full">
                    <Carousel className="w-full max-w-none">
                      <CarouselContent>
                        {activeProjects.map((item, idx) => (
                          <CarouselItem key={idx}>
                            <div className="p-1 h-96 md:h-[26rem]">
                              <Card
                                className="group h-full flex flex-col overflow-hidden
                                bg-white/70 dark:bg-[#0f0f12]/80
                                backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60
                                shadow-sm hover:shadow-md hover:-translate-y-[4px]
                                transition-all duration-300 ease-out rounded-2xl ring-1 ring-transparent hover:ring-indigo-300/40">
                                <CardHeader className="relative p-0 overflow-hidden rounded-t-2xl">
                                  <Image
                                    src={String(item?.image)}
                                    alt={item?.name ?? `Project ${idx}`}
                                    width={640}
                                    height={320}
                                    className="object-cover w-full h-40 transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
                                    sizes="(max-width: 768px) 100vw, 480px"
                                    priority={idx === 0}
                                  />
                                  <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent
                                    opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                                  />
                                </CardHeader>

                                {/* đảm bảo min-height đủ cho 3 dòng text */}
                                <CardContent className="p-4 space-y-2 flex-1 overflow-hidden min-h-[4rem] md:min-h-[8.5rem]">
                                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-2">
                                    {item?.name}
                                  </h3>

                                  {item?.content && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                                      {item?.content}
                                    </p>
                                  )}
                                </CardContent>

                                <CardFooter className="p-4 pt-0 mt-auto">
                                  <Button
                                    onClick={() => handleOpenCardJob(item)}
                                    onMouseEnter={handlePreloadData}
                                    onMouseLeave={handleClearPreload}
                                    className="group/btn">
                                    Xem chi tiết
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                  </Button>
                                </CardFooter>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
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
      {/* Dialog hiển thị chi tiết dự án với animation tối ưu */}
      <AnimatePresence mode="wait">
        {openCardJob && (
          <Dialog open={openCardJob} onOpenChange={setOpenCardJob}>
            <DialogContent className="w-full sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle className="sr-only">
                  Chi tiết dự án {detailJob?.name || ""}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Thông tin chi tiết về dự án {detailJob?.name || ""} bao gồm
                  công nghệ sử dụng, tính năng và timeline thực hiện.
                </DialogDescription>
              </DialogHeader>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  duration: 0.2,
                  ease: [0.4, 0.0, 0.2, 1],
                  opacity: { duration: 0.15 },
                }}>
                {detailJob && <CardJob item={detailJob} />}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
