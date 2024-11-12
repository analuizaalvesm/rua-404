import { BRAND } from "@/models/brand";
import { FiInstagram } from "react-icons/fi";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";

const brandData: BRAND[] = [
  {
    icon: <BsGoogle size={22} />,
    name: "Google",
    visitors: 3.5,
    revenues: "459,90",
    sales: 20,
    conversion: 4.8,
  },
  {
    icon: <BsTwitter size={22} />,
    name: "Twitter",
    visitors: 2.2,
    revenues: "120,00",
    sales: 16,
    conversion: 4.3,
  },
  {
    icon: <FiInstagram size={22} />,
    name: "Instagram",
    visitors: 1.5,
    revenues: "345,00",
    sales: 89,
    conversion: 2.5,
  },
  {
    icon: <BsFacebook size={22} />,
    name: "Facebook",
    visitors: 3.5,
    revenues: "600,00",
    sales: 32,
    conversion: 4.2,
  },
  {
    icon: <FaCirclePlus size={22} />,
    name: "Outros",
    visitors: 4.5,
    revenues: "1.200,00",
    sales: 45,
    conversion: 5.2,
  },
];

const TableOne = () => {
  return (
    <div className="col-span-7 rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Principais canais de divulgação
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-100 sm:grid-cols-5 text-gray-600">
          <div className="p-2 xl:p-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Origem
            </h5>
          </div>
          <div className="p-2 text-center xl:p-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Visitantes
            </h5>
          </div>
          <div className="p-2 text-center xl:p-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Receita
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Vendas
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversão
            </h5>
          </div>
        </div>

        <div className="max-h-88 overflow-y-auto">
          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === brandData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-3">
                {brand.icon && (
                  <div className="flex-shrink-0">{brand.icon}</div>
                )}
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.visitors}K</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">R$ {brand.revenues}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{brand.sales}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5 text-green-500">
                  {brand.conversion}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOne;
