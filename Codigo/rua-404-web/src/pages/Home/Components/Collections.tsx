import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Collection = {
  id: number;
  name: string;
  texto: string;
};

const Collections = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/cms/listar-colecoes"
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center py-8">
      {items.map((item, index) => {
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
