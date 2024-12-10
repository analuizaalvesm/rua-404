import { useNavigate } from "react-router-dom";

const Banner = ({ texto, descricao }: { texto: string; descricao: string }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="py-14">
            <h1 className="text-6xl text-center font-orbitron-bold text-white tracking-wider uppercase">
              {texto ? texto : "This is ARTE DE RUA"}
            </h1>
            <p className="text-gray-600 text-center text-lg text-white leading-relaxed mt-8 px-32">
              {descricao
                ? descricao
                : "Onde a tecnologia encontra a arte nas ruas, transformando o urbano em um playground digital. Somos um coletivo que mistura intervenções urbanas e arte multimídia para criar experiências imersivas e únicas. Conecte-se com o futuro da arte, onde cada projeto é uma nova interação entre o digital e o real."}
            </p>
            <div className="flex justify-center">
              <button
                className="border-2 border-white bg-white hover:bg-black text-black hover:text-white px-6 py-3 uppercase text-md tracking-wider
      transition-colors duration-300 mt-8"
                onClick={() => navigate("/about-us")}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
