import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

// Safe Indonesian Date Formatter to avoid hydration mismatch
const formatDateId = (dateString) => {
  if (!dateString) return "";
  
  // Attempt to parse YYYY-MM-DD directly
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const day = date.getDate();
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      return `${day} ${months[monthIndex]} ${year}`;
    } catch {
      return dateString;
    }
  }
  
  const [_, year, month, day] = match;
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const monthName = months[parseInt(month, 10) - 1] || month;
  return `${parseInt(day, 10)} ${monthName} ${year}`;
};

const CardPromotion = ({ props }) => {
  const formattedDate = formatDateId(props?.created_at);

  return (
    <div className="group shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl bg-white p-3.5 mb-10 border border-gray-100 hover:border-blue-light/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1">
      <Link href={`/Detail/promo/${props?.id}`} className="block">
        {/* Image Container with Badge */}
        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
          {/* Promo Badge */}
          <span className="absolute top-2.5 left-2.5 bg-blue-semi text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm z-10 tracking-wider">
            PROMO
          </span>
          <Image
            src={props?.image_url}
            alt={props?.title || "Promotion Image"}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Card Body */}
        <div className="pt-3.5 pb-1 px-1">
          {/* Title */}
          <h1 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-semi transition-colors duration-200 min-h-[40px] flex items-start">
            {props?.title}
          </h1>
          
          {/* Divider */}
          <div className="h-[1px] bg-gray-100 my-2.5 w-full"></div>
          
          {/* Footer: Date & Link Indicator */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5 text-text-gray">
              <Calendar className="w-3.5 h-3.5 text-blue-light" />
              <span className="text-[11px] font-medium tracking-wide">{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-0.5 text-blue-semi text-[11px] font-semibold group-hover:text-blue-light transition-colors">
              <span>Detail</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardPromotion;

