"use client";
import React, { useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import SidebarLayout from "./sidebar/layout";
import ArticleCard from "@/components/card/article-card";
import {
  ArrowRightIcon,
  CircleArrowRightIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  BookOpen,
} from "lucide-react";

import { experiences } from "@/mock/experience";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { educations } from "@/mock/education";

// Lazy load các component nặng
const AnimatedTestimonials = dynamic(
  () =>
    import("@/components/ui/animated-ui/animated-testimonials").then((mod) => ({
      default: mod.AnimatedTestimonials,
    })),
  {
    loading: () => (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-24 w-full"></div>
      </div>
    ),
    ssr: false,
  }
);

const Timeline = dynamic(() => import("@/components/timeline-02/timeline-02"), {
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-80 w-full"></div>
    </div>
  ),
  ssr: false,
});

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPagination = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.querySelector(".article-card") as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    const scrollOptions: ScrollToOptions = {
      left:
        direction == "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    };
    container.scrollTo(scrollOptions);
  };

  return (
    <SidebarLayout>
      <div className="space-y-10">
        {/* Giới thiệu */}
        <div className="w-full px-1 mx-auto">
          <h1 className="lg:text-3xl md:text-2xl font-bold tracking-tight uppercase text-lg">
            Xin chào, Tên tôi là Ngô Văn Đức
          </h1>

          <ul className="flex gap-4 p-2 py-4 text-muted-foreground font-medium items-center">
            <li className="flex items-center">
              <span className="mr-1 sm:mr-2">
                <CircleArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="text-[12px] sm:text-[14px] md:text-[16px] ">
                Phát triển Web Full-stack
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-1 sm:mr-2">
                <CircleArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="text-[12px] sm:text-[14px] md:text-[16px] ">
                Lập trình viên Full-time
              </span>
            </li>
          </ul>

          <p className="text-muted-foreground text-sm leading-6 w-full font-medium whitespace-normal break-words">
            Tôi là lập trình viên Fullstack với gần 2 năm kinh nghiệm, đam mê
            xây dựng các ứng dụng web hiệu quả và thân thiện với người dùng. Tôi
            đã có kinh nghiệm tham gia vào những dự án nội bộ và thương mại
            trước đây, đóng góp vào sự phát triển của cả cá nhân và công ty. Mục
            tiêu ngắn hạn của tôi là có thể tiếp tục nâng cao năng lực và đóng
            góp cho các dự án có thể tham gia. Mục tiêu dài hạn của tôi là có
            thể học hỏi, làm việc với nhiều vai trò khác như quản lý hoặc cầu
            nối khách hàng.
          </p>
        </div>

        <div className="w-full px-1 mx-auto">
          <div className="flex justify-between lg:mb-6 mb-3 cursor-pointer group">
            <h2 className="lg:text-2xl font-bold items-center text-sm">
              Bài viết mới nhất
            </h2>
            <div className="flex gap-2 items-center group-hover:brightness-75 transition-all">
              <span className="font-semibold text-sm lg:text-lg">
                Xem tất cả
              </span>
              <ArrowRightIcon
                size={14}
                className="group-hover:-rotate-45 transition-transform duration-300"
              />
            </div>
          </div>
          <div>
            {/* Container scroll */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth mb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}>
              <ArticleCard className="flex-shrink-0 article-card" />
              <ArticleCard className="flex-shrink-0 article-card" />
              <ArticleCard className="flex-shrink-0 article-card" />
              <ArticleCard className="flex-shrink-0 article-card" />
              <ArticleCard className="flex-shrink-0 article-card" />
              <ArticleCard className="flex-shrink-0 article-card" />
            </div>

            {/* Buttons dưới bên phải */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => scrollPagination("left")}
                className="bg-white/10 hover:bg-white/30 border border-gray-300 rounded-sm p-1 transition-colors shadow-sm"
                aria-label="Scroll left">
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollPagination("right")}
                className="bg-white/10 hover:bg-white/30 border border-gray-300 rounded-sm p-1 transition-colors shadow-sm"
                aria-label="Scroll right">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="flex justify-between group py-1">
            <h2 className="lg:text-2xl font-bold items-center text-sm">
              Công cụ tôi có thể dùng
            </h2>
          </div>
          <Suspense
            fallback={
              <div className="w-full h-32 flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-24 w-full"></div>
              </div>
            }>
            <AnimatedTestimonials
              data={[
                {
                  description:
                    "Thư viện UI mạnh mẽ cho React với các component có sẵn, dễ customize và accessibility tốt. Perfect cho việc xây dựng giao diện hiện đại nhanh chóng.",
                  image:
                    "https://images.viblo.asia/548b7fea-3301-4c27-b436-2d3a70606d81.png",
                  name: "React",
                },
                {
                  description:
                    "Ngôn ngữ lập trình đa năng, dễ học và mạnh mẽ. Phù hợp cho web development, data science, AI/ML và automation.",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSkjA64ptIZHXfiI4AA-6w2U-_d5t1h2ojQ&s",
                  name: "Python",
                },
                {
                  description:
                    "ORM hiện đại cho Node.js và TypeScript. Type-safe, dễ sử dụng và hỗ trợ nhiều database. Làm việc với database chưa bao giờ đơn giản đến vậy.",
                  image:
                    "https://cdn-1.webcatalog.io/catalog/prisma-data-platform/prisma-data-platform-icon-filled-256.webp?v=1714776724281",
                  name: "Prisma",
                },
                {
                  description:
                    "Collection các component đẹp và accessible được build trên Radix UI. Copy, paste và customize dễ dàng. Best choice cho React projects.",
                  image: "https://ui.shadcn.com/apple-touch-icon.png",
                  name: "shadcn/ui",
                },
                {
                  description:
                    "Framework hiện đại cho Python để build API cực nhanh. Type hints, auto docs, async support và performance vượt trội.",
                  image: "https://cdn.worldvectorlogo.com/logos/fastapi.svg",
                  name: "FastAPI",
                },
                {
                  description:
                    "Node.js + ExpressJS/Fastify. Perfect cho việc xây dựng web applications và APIs với kiến trúc đơn giản, dễ mở rộng.",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFwrcvX28Ty3ZNNefYjtMWFwnL04kS3SO8wA&s",
                  name: "Node.js",
                },
                {
                  description:
                    "React framework với Server Components, App Router, và built-in optimization. SSR, SSG, ISR - everything you need cho production-ready apps.",
                  image:
                    "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67",
                  name: "Next.js",
                },
                {
                  description:
                    "Material UI là một thư viện thành phần React nguồn mở triển khai Material Design của Google. Thư viện này rất toàn diện và có thể được sử dụng ngay khi xuất xưởng",
                  image:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY3K5XUSRCmsfO3GQ2frO7dRV2_e-jQ-xrg&s",
                  name: "Material UI",
                },
              ]}
            />
          </Suspense>

          <div className="flex justify-between group py-1">
            <h2 className="lg:text-2xl font-bold items-center text-sm">
              Kinh nghiệm làm việc
            </h2>
          </div>
          <div id="experience-work">
            <div className="w-full mb-10">
              <div className="md:px-4 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center pt-4 pb-2 gap-4">
                    <Avatar
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-1 
                        border bg-white/10 backdrop-blur-xs shadow-md shadow-gray-400/30">
                      <AvatarImage
                        className="rounded-full"
                        src="/experience/gif_experience.gif"
                        alt="GIF Experience"
                      />
                      <AvatarFallback>GIF Experience</AvatarFallback>
                    </Avatar>
                    <h2 className="lg:text-xl font-medium leading-snug items-center text-lg text-[#fffffe]">
                      Thời gian
                    </h2>
                    <span
                      className="relative w-2 h-2 rounded-full mt-1 bg-[#7f5af0] 
                      before:content-[''] before:absolute before:inset-0 before:bg-inherit 
                      before:rounded-full before:-z-10 before:animate-[ripple_1.5s_ease-out_infinite]"></span>
                  </div>

                  <Timeline experiences={experiences} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full px-1 mx-auto">
          <h2 className="lg:text-2xl font-bold items-center text-sm">
            Con đường học tập
          </h2>
          <div className="md:px-4 rounded-lg">
            <div className="flex items-center pt-4 pb-2 gap-4">
              <Avatar
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-1 
                        border bg-white/10 backdrop-blur-xs shadow-md shadow-gray-400/30">
                <AvatarImage
                  className="rounded-full"
                  src="/experience/internet.gif"
                  alt="GIF Experience"
                />
                <AvatarFallback>GIF Study</AvatarFallback>
              </Avatar>
              <h2 className="lg:text-xl font-medium leading-snug items-center text-lg text-[#fffffe]">
                Học vấn
              </h2>
              <span
                className="relative w-2 h-2 rounded-full mt-1 bg-[#7f5af0] 
                      before:content-[''] before:absolute before:inset-0 before:bg-inherit 
                      before:rounded-full before:-z-10 before:animate-[ripple_1.5s_ease-out_infinite]"></span>
            </div>
            <div className="space-y-6 pl-0 mt-4">
              {educations.map((edu, index) => (
                <div
                  key={index}
                  className="relative pb-6 border-l-2 border-purple-500/30 last:border-l-0 last:pb-0">
                  {/* Education card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 group">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Left side - Information (50%) */}
                      <div className="flex-1 md:w-1/2">
                        <h3 className="text-base md:text-lg font-semibold text-[#fffffe] mb-2 group-hover:text-purple-300 transition-colors">
                          {edu.school}
                        </h3>
                        <p className="text-purple-300 font-medium mb-3 text-sm md:text-base">
                          {edu.degree}
                        </p>
                        <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-300 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
                            <span>{edu.location}</span>
                          </div>
                        </div>

                        {/* GPA */}
                        <div className="inline-block bg-purple-500/20 px-3 py-1 rounded-full mb-3">
                          <p className="text-xs md:text-sm text-purple-200 font-medium">
                            {edu.gpa}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-400 mb-3">
                          {edu.description}
                        </p>

                        {/* Achievements */}
                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="w-4 h-4 text-purple-400" />
                              <span className="text-xs md:text-sm font-medium text-gray-300">
                                Thành tích nổi bật:
                              </span>
                            </div>
                            <ul className="space-y-1.5 ml-6">
                              {edu.achievements.map((achievement, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs md:text-sm text-gray-400 relative before:content-['•'] before:absolute before:-left-4 before:text-purple-400">
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Right side - Image (50%) */}
                      <div className="flex-1 md:w-1/2">
                        <div className="w-full h-full min-h-[200px] md:min-h-[300px] rounded-lg overflow-hidden bg-white/5 border border-white/10">
                          <img
                            src={edu.image}
                            alt={edu.school}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
