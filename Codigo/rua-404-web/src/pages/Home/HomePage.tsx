import { Heart } from "lucide-react";
import { FaCirclePlus } from "react-icons/fa6";
import { BiChevronsRight } from "react-icons/bi";
import logoWhite from "../../assets/images/y2k_star_white.png";
import MarqueeDemo from "@/components/custom/Marquee/Marquee";
import chevronRight from "../../assets/icons/mdi_chevron-right.svg";
import stars from "../../assets/images/stars.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Pack de Stickers - Rua 4.0.4 x NOID",
      price: 29.9,
      description: "O pack de stickers contém 10 adesivos exclusivos.",
      url: "https://i.postimg.cc/wxDv7WL1/353431933-928363248425229-3676118437973366747-n-2.jpg",
    },
    {
      id: 2,
      name: "Pack de Stickers - Rua 4.0.4 x Caxim",
      price: 29.9,
      description: "O pack de stickers contém 10 adesivos exclusivos.",
      url: "https://i.postimg.cc/dVn1BLVr/439959573-278219802010402-6715365152263004301-n.jpg",
    },
    {
      id: 3,
      name: "Print He4rtz - Rua 4.0.4 ORIGINALS",
      price: 39.9,
      description:
        "O print é feito em papel de alta qualidade, possui 30x40cm.",
      url: "https://i.postimg.cc/W179zf70/369410471-3538119029767978-1999375231937910149-n-1.jpg",
    },
    {
      id: 4,
      name: "Print D0ggyStyl3 - Rua 4.0.4 ORIGINALS",
      price: 59.9,
      description:
        "O print é feito em papel de alta qualidade, possui 30x40cm.",
      url: "https://i.postimg.cc/Xqzhr0vq/367947548-872009731261392-8560140716422544110-n.jpg",
    },
  ];

  const events = [
    {
      id: 1,
      name: "BH Sticker",
      description:
        "O BH Sticker é um evento que reúne artistas de rua de BH, com foco em colantes, adesivos, stickers, pegatinas e lambe-lambe.",
      url: "https://scontent.fplu41-1.fna.fbcdn.net/v/t1.6435-9/64508182_2312031355509716_759115429250596864_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0327a3&_nc_ohc=LL_oltatlosQ7kNvgFdOodQ&_nc_zt=23&_nc_ht=scontent.fplu41-1.fna&_nc_gid=AqbE-9K_HsrivdYc4aMvOHW&oh=00_AYASzAYQoTquQu_gmJW-ZbzysgZHnMUlTV352PQ_BrjeLw&oe=674E1867",
    },
    {
      id: 2,
      name: "Festival de Colantes",
      description:
        "Festival internacional de arte de rua - 3a edição, 16 de novembro de 2024",
      url: "https://images.sympla.com.br/66d8c3b32339d.png",
    },
    {
      id: 3,
      name: "Graffitei",
      description:
        "O Graffitei está em sua 5a edição e reúne artistas de rua de todo o Brasil.",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRD3aepNKUVsLXSs2v3P96umqvnDupAKjzrw&s",
    },
    {
      id: 4,
      name: "UFMG Aberta",
      description: "Evento de arte público na UFMG, 20 de outubro de 2024",
      url: "https://ufmg.br/thumbor/xbQ-RF3VI9hOwOORFLbVpfAmiow=/582x0:1642x712/712x474/https://ufmg.br/storage/f/6/f/3/f6f34e51447a53ba803c46f05480f64a_16298404783736_616673285.jpg",
    },
  ];

  const Banner404 = () => {
    return (
      <div className="w-full bg-black py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="py-14">
              <h1 className="text-6xl text-center font-orbitron-regular text-white tracking-wider uppercase">
                This is
              </h1>
              <p className="text-6xl text-center font-orbitron-bold text-white tracking-wider uppercase">
                ARTE DE RUA
              </p>
              <p className="text-gray-600 text-center text-lg text-white leading-relaxed mt-8 px-32">
                Onde a tecnologia encontra a arte nas ruas, transformando o
                urbano em um playground digital. Somos um coletivo que mistura
                intervenções urbanas e arte multimídia para criar experiências
                imersivas e únicas. Conecte-se com o futuro da arte, onde cada
                projeto é uma nova interação entre o digital e o real.
              </p>
              <div className="flex justify-center">
                <button
                  className="border-2 border-white bg-white hover:bg-black text-black hover:text-white px-6 py-3 uppercase text-md tracking-wider
    transition-colors duration-300 mt-8"
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

  return (
    <div className="min-h-screen bg-white">
      <Banner404 />
      <MarqueeDemo />

      <section className="mx-auto max-w-screen-2xl px-16 pt-8 pb-24">
        <h2 className="text-5xl font-orbitron-bold mb-8">RUA STORE</h2>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 w-full max-w-sm"
            >
              <div className="relative bg-gray-200 aspect-[6/3] border border-black">
                <img
                  src={product.url}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
                <button className="absolute top-2 right-0 bg-transparent hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-orbitron-medium mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  {product.description}
                </p>
                <p className="text-2xl font-bold mb-4">
                  R$ {product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => navigate(`/store`)}
                  className="w-full bg-black text-white py-2.5 text-center hover:bg-gray-800 transition-colors"
                >
                  Ver na loja
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex flex-row justify-between items-start">
          <div className="absolute left-0">
            <img src={logoWhite} className="w-40 h-40 mt-4" />
          </div>
          <div className="absolute right-0">
            <img src={chevronRight} className="w-16 h-16 mt-4" />
          </div>
        </div>
      </section>

      <div className="bg-gray-100 border border-y-black pb-14">
        <section className="mx-auto max-w-screen-2xl px-16 py-8">
          <h2 className="text-5xl font-orbitron-bold mb-8 flex justify-end items-center">
            EXIBIÇÕES & EVENTOS
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative bg-gray-100 w-full max-w-screen overflow-hidden shadow-lg min-h-[400px]"
              >
                <img
                  src={event.url}
                  alt="Event Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 brightness-[0.4]"
                />
                <div className="relative p-8 flex flex-col justify-between h-full text-white">
                  <div>
                    <h3 className="text-2xl font-orbitron-medium mb-4">
                      {event.name}
                    </h3>
                    <p className="text-sm ">{event.description}</p>
                  </div>
                  <button className=" px-4 py-3 border border-white bg-transparent text-white text-sm uppercase tracking-wide hover:bg-white hover:text-black transition">
                    Ver mais
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex flex-row justify-between items-start">
            <div className="absolute right-0">
              <img src={stars} className="h-40 w-40" />
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-screen-2xl px-16 py-8">
        <h2 className="text-5xl font-orbitron-bold mb-8">COLEÇÕES & COLLABS</h2>
        <div className="flex space-x-6">
          <div className="border border-black flex-1">
            <div className="p-4">
              <h3 className="text-xl font-orbitron-bold mb-2">
                +10 parcerias com artistas de bh
              </h3>
              <p className="text-sm text-gray-600 mr-4 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="border-t border-black">
              <button className="bg-transparent w-full text-black px-3 py-2 hover:bg-black transition-colors duration-300">
                <div className="flex flex-row items-center space-x-3 hover:text-white transition-colors duration-300">
                  <FaCirclePlus size={20} />
                  <p className="text-lg font-orbitron-medium">
                    entenda a iniciativa
                  </p>
                </div>
              </button>
            </div>
          </div>
          <div className="border border-black flex-1">
            <div className="p-4">
              <h3 className="text-xl font-orbitron-bold mb-2">+30 stickers</h3>
              <p className="text-sm text-gray-600 mr-4 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="border-t border-black">
              <button className="bg-black w-full text-black px-3 py-2 hover:bg-white transition-colors duration-300">
                <div className="flex flex-row items-center justify-end space-x-3 text-white hover:text-black transition-colors duration-300">
                  <p className="text-lg font-orbitron-medium">confira</p>
                  <BiChevronsRight size={24} />
                </div>
              </button>
            </div>
          </div>
          <div className="border border-black flex-1">
            <div className="p-4">
              <h3 className="text-xl font-orbitron-bold mb-2">+20 prints</h3>
              <p className="text-sm text-gray-600 mr-4 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="border-t border-black">
              <button className="bg-black w-full text-black px-3 py-2 hover:bg-white transition-colors duration-300">
                <div className="flex flex-row items-center justify-end space-x-3 text-white hover:text-black transition-colors duration-300">
                  <p className="text-lg font-orbitron-medium">confira</p>
                  <BiChevronsRight size={24} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-8">
        <div className="flex justify-center">
          <div className="flex flex-row">
            <p className="text-md font-orbitron-regular mt-4 mr-2">
              última collab
            </p>
            <h3 className="text-5xl font-orbitron-bold mb-4 mt-4">NOID</h3>
          </div>
        </div>

        <div className="flex flex-row justify-center bg-black">
          <div className="flex flex-row">
            <p className="text-md font-orbitron-regular text-white mt-4 mr-2">
              último evento
            </p>
            <h3 className="text-5xl font-orbitron-bold text-white mb-4 mt-4">
              BH CONECTA
            </h3>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-row">
            <p className="text-md font-orbitron-regular mt-4 mr-2">
              última coleção
            </p>
            <h3 className="text-5xl font-orbitron-bold mb-4 mt-4">
              4.0.4 COLLECTION
            </h3>
          </div>
        </div>

        <button className="w-[70vh] bg-black text-black px-3 py-2 mt-8">
          <p className="text-lg font-orbitron-medium text-white text-center">
            CONFIRA
          </p>
        </button>
      </div>
    </div>
  );
};

export default Home;
