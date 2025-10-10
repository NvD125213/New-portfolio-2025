import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MapPin, CheckCircle2, Users } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { memo, useMemo } from "react";

function CardJobComponent({ item }: { item?: any }) {
  const { toast } = useToast();

  // Tối ưu với useMemo để tránh tính toán lại không cần thiết
  const projectData = useMemo(
    () => ({
      name: item?.name || "Untitled Project",
      image:
        item?.image || "https://via.placeholder.com/400x200.png?text=No+Image",
      content: item?.content || "This project is currently under development.",
      timesize: item?.timesize || "N/A",
      teamsize: item?.teamsize || "5 members",
      technologies: item?.technologies || [
        {
          name: "React",
          icon: "/icon/react.avif",
        },
        {
          name: "FastAPI",
          icon: "/icon/fastapi.svg",
        },
        {
          name: "Postgres",
          icon: "/icon/postgres.jpg",
        },
      ],
      scope: item?.scope || "Web Application",
      timeline: item?.timeline || "3 months",
      feature: item?.feature || [
        "User authentication and authorization",
        "Responsive dashboard UI",
        "Data visualization with charts",
        "RESTful API integration",
      ],
    }),
    [item]
  );

  const {
    name,
    image,
    content,
    timesize,
    teamsize,
    technologies,
    scope,
    timeline,
    feature,
  } = projectData;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="md:w-2/5 w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-56 md:h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="md:w-3/5 w-full flex flex-col justify-between">
        <CardHeader className="flex flex-col gap-1 px-5 pt-4 pb-1">
          <div className="flex items-start w-full">
            <CardTitle className="text-xl font-semibold line-clamp-1">
              {name}
            </CardTitle>
          </div>
          <CardDescription className="text-sm text-gray-600 mt-1">
            {content}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-5 py-2 space-y-2 flex-1 overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-gray-300">
          {/* Thông tin chung */}
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timesize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{teamsize}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{scope}</span>
            </div>
          </div>

          {/* Technologies */}
          <div className="mt-1">
            <h4 className="text-sm font-semibold mb-1 text-gray-800 dark:text-white/50">
              Technologies:
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: any, i: number) => (
                <div
                  key={i}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md ${tech.bg} ${tech.classname}`}>
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-2">
            <h4 className="text-sm font-semibold mb-1 text-gray-800 dark:text-white/50">
              Key Features:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-600">
              {feature.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-1">
                  <CheckCircle2 className="w-3 h-3 mt-[2px] text-green-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        {/* Footer (bỏ View Detail) */}
        <CardFooter className="flex justify-end items-center px-5 py-3 border-t">
          <span className="text-xs text-gray-500 italic">
            Timeline: {timeline}
          </span>
        </CardFooter>
      </div>
    </div>
  );
}

// Sử dụng React.memo để tránh re-render không cần thiết
export default memo(CardJobComponent);
