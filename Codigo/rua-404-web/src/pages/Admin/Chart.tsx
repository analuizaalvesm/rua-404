import React from "react";
import Breadcrumb from "../../components/admin/components/Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/admin/components/Charts/ChartOne";
import ChartThree from "../../components/admin/components/Charts/ChartThree";
import ChartTwo from "../../components/admin/components/Charts/ChartTwo";

const Chart: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;
