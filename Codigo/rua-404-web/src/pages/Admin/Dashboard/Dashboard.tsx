import React from "react";
import CardDataStats from "@/components/admin/components/CardDataStats";
import ChartOne from "@/components/admin/components/Charts/ChartOne";
import ChartThree from "@/components/admin/components/Charts/ChartThree";
import ChartTwo from "@/components/admin/components/Charts/ChartTwo";
import TableOne from "@/components/admin/components/Tables/TableOne";
import { FiEye, FiShoppingBag, FiUser } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";

const stats = [
  {
    title: "Total de visualizações",
    total: "3.450",
    rate: "0.43%",
    levelUp: true,
    icon: <FiEye size={20} />,
  },
  {
    title: "Lucro total",
    total: "R$ 2.450,00",
    rate: "4.35%",
    levelUp: true,
    icon: <BsCurrencyDollar size={20} />,
  },
  {
    title: "Total de compras",
    total: "542",
    rate: "2.59%",
    levelUp: true,
    icon: <FiShoppingBag size={20} />,
  },
  {
    title: "Total de usuários",
    total: "200",
    rate: "0.95%",
    levelDown: true,
    icon: <FiUser size={20} />,
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {stats.map((stat, index) => (
          <CardDataStats
            key={index}
            title={stat.title}
            total={stat.total}
            rate={stat.rate}
            levelUp={stat.levelUp}
            levelDown={stat.levelDown}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <TableOne />
      </div>
    </>
  );
};

export default Dashboard;
