import React, { ReactNode } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  icon: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  icon,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
        {icon}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-xl font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp ? "text-meta-3 text-green-500" : ""
          } ${levelDown ? "text-meta-5 text-red-500" : ""}`}
        >
          {rate}
          {levelUp && <FiArrowUp size={16} className="fill-meta-3" />}
          {levelDown && <FiArrowDown size={16} className="fill-meta-5" />}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
