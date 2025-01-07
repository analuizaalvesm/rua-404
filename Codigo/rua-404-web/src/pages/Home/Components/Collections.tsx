import { useNavigate } from "react-router-dom";

type Collection = {
  id: number;
  name: string;
  texto: string;
};

type CollectionsProps = {
  collections: Collection[];
};

const Collections = ({ collections }: CollectionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-8">
      {collections.map((item, index) => {
        const isOdd = index % 2 !== 0;
        const backgroundClass = isOdd ? "bg-black" : "bg-white";
        const textColorClass = isOdd ? "text-white" : "text-black";

        return (
          <div
            key={item.id}
            className={`flex justify-center ${backgroundClass}`}
          >
            <div className="flex flex-row">
              <p
                className={`text-md font-orbitron-regular mt-4 mr-2 ${textColorClass}`}
              >
                {item.name.toLowerCase()}
              </p>
              <h3
                className={`text-5xl font-orbitron-bold mb-4 mt-4 ${textColorClass}`}
              >
                {item.texto}
              </h3>
            </div>
          </div>
        );
      })}

      <button className="w-[70vh] bg-black text-black px-3 py-2 mt-8">
        <p
          onClick={() => navigate("/about-us")}
          className="text-lg font-orbitron-medium text-white text-center"
        >
          CONFIRA
        </p>
      </button>
    </div>
  );
};

export default Collections;
