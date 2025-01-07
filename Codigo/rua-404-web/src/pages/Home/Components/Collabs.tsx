import { FaCirclePlus } from "react-icons/fa6";
import { BiChevronsRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type Collab = {
  id: number;
  name: string;
  texto: string;
};

type CollabsProps = {
  collabs: Collab[];
};

const Collabs = ({ collabs }: CollabsProps) => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-screen-2xl px-16 py-8">
      <h2 className="text-5xl font-orbitron-bold mb-8">COLEÇÕES & COLLABS</h2>
      <div className="flex space-x-6">
        {collabs.map((collab, index) => (
          <div
            key={collab.id}
            className={`border border-black flex-1 ${
              index === 0 ? "" : "bg-white text-black"
            }`}
          >
            <div className="p-4">
              <h3 className="text-xl font-orbitron-bold mb-2">
                +{collab.name}
              </h3>
              <p className="text-sm text-gray-600 mr-4 mb-8">{collab.texto}</p>
            </div>
            <div className="border-t border-black">
              {index === 0 ? (
                <button
                  onClick={() => navigate("/about-us")}
                  className="bg-transparent w-full text-black px-3 py-2 hover:bg-black transition-colors duration-300"
                >
                  <div className="flex flex-row items-center space-x-3 hover:text-white transition-colors duration-300">
                    <FaCirclePlus size={20} />
                    <p className="text-lg font-orbitron-medium">
                      entenda a iniciativa
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/about-us")}
                  className="bg-black w-full text-black px-3 py-2 hover:bg-white transition-colors duration-300"
                >
                  <div className="flex flex-row items-center justify-end space-x-3 text-white hover:text-black transition-colors duration-300">
                    <p className="text-lg font-orbitron-medium">confira</p>
                    <BiChevronsRight size={24} />
                  </div>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collabs;
