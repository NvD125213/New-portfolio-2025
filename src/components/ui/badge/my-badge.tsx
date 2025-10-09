import Image from "next/image";
interface BadgeProps {
  icon?: string; // icon là string (đường dẫn ảnh)
  name: string;
  bg?: string;
  classname?: string;
}

export default function BadgeCustom({
  icon,
  name,
  bg = "bg-gray-200",
  classname = "text-gray-800",
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bg} ${classname}`}>
      {icon && (
        <Image src={icon} width={16} height={16} alt="" className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}
