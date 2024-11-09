import Breadcrumb from "@/components/admin/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/admin/components/Tables/TableOne";
import TableThree from "@/components/admin/components/Tables/TableThree";
import TableTwo from "@/components/admin/components/Tables/TableTwo";

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
