import { ViewIcon, HeartPlusIcon, CalendarFoldIcon } from "lucide-react";
import Image from "next/image";

const ArticleCard = ({ className }: any) => {
  return (
    <div
      className={`relative min-w-[80vw] sm:min-w-[45%] md:min-w-[30%] max-w-xs lg:min-h-[400px] md:min-h-[350px] min-h-[320px] rounded-xl shadow-lg overflow-hidden group cursor-pointer ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:opacity-80 group-hover:scale-115"
        style={{ backgroundImage: "url('/article/bg-technical-2.jpg')" }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Header Tag */}
      <div className="relative px-4 pt-4">
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white md:text-xs text-[10px] font-semibold px-3 py-1 rounded-full shadow m-1">
          # Technical
        </span>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white md:text-xs text-[10px] font-semibold px-3 py-1 rounded-full shadow m-1">
          # New
        </span>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white md:text-xs text-[10px] font-semibold px-3 py-1 rounded-full shadow m-1">
          # Hot
        </span>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white md:text-xs text-[10px] font-semibold px-3 py-1 rounded-full shadow m-1">
          # Node
        </span>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white md:text-xs text-[10px] font-semibold px-3 py-1 rounded-full shadow m-1">
          # ExpressJS
        </span>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white md:text-xs text-[10px] font-semibold px-3 py-1 rounded-full shadow m-1">
          # Database
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full">
        <div className="px-4 py-4">
          <h2 className="md:text-lg font-bold text-white drop-shadow-md text-sm">
            10 Extensions hay dành cho các Dev Frontend năm 2025 bạn nên biết
          </h2>
          <p className="text-sm flex gap-1 items-center text-gray-300 mt-1">
            <CalendarFoldIcon className="w-4 h-4" />
            Oct 3, 2025
          </p>
          <p className="text-gray-200 text-sm mt-2 line-clamp-3">
            Trong bài viết này, chúng ta sẽ tìm hiểu 10 cách hiệu quả để nâng
            cao kỹ năng phát triển web, từ việc tối ưu code đến quản lý dự án.
          </p>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-white/20 relative">
          {/* Avatar + Name */}
          <div className="flex items-center">
            <Image
              src="/avatar/avatar.png"
              className="rounded-full mr-2"
              width={32}
              height={32}
              alt="Author"
            />
          </div>

          {/* Likes + Views (ẩn khi hover) */}
          {/* Likes + Views (ẩn khi hover) */}
          <div className="flex items-center text-gray-200 text-sm gap-4 transition-all duration-300 group-hover:opacity-0 group-hover:invisible">
            <div className="flex items-center gap-1">
              <HeartPlusIcon className="w-4 h-4 text-red-400" />
              <span>124</span>
            </div>
            <div className="flex items-center gap-1">
              <ViewIcon className="w-4 h-4" />
              <span>356</span>
            </div>
          </div>

          {/* Read more (hover mới hiện) */}
          <div className="absolute right-4 bottom-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <button className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow">
              Read more →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
