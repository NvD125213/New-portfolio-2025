"use client";
import React from "react";
import SidebarLayout from "./sidebar/layout";
import ArticleCard from "@/components/card/article-card";
import { AnimatedTestimonials } from "@/components/ui/animated-ui/animated-testimonials";
import {
  ArrowRightIcon,
  CircleArrowRightIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRef } from "react";

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
              <span className="text-[12px] sm:text-[16px] md:text-[18px] ">
                Phát triển Web Full-stack
              </span>
            </li>
            <li className="flex items-center">
              <span className="mr-1 sm:mr-2">
                <CircleArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="text-[12px] sm:text-[16px] md:text-[18px] ">
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

          <div className="flex justify-between group py-1">
            <h2 className="lg:text-2xl font-bold items-center text-sm">
              Kinh nghiệm làm việc
            </h2>
          </div>
          <div id="experience-work">
            <div className="w-full">
              <div className="px-4 rounded-lg">
                <div className="space-y-4">
                  <Avatar
                    className={
                      "flex h-8 w-8 shrink-0 items-center  rounded-full justify-center bg-[var(--card-background)] border p-1"
                    }>
                    <AvatarImage src="/avatar/avatar.png" alt="Ngô Văn Đức" />
                    <AvatarFallback>NVD Avatar</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
