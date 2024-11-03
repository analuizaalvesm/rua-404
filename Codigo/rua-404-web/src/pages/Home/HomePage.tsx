import React from "react";
import { CirclePlusIcon, Heart } from "lucide-react";
import { FaCirclePlus, FaChevronRight } from "react-icons/fa6";
import { BiChevronsRight } from "react-icons/bi";
import logo from "../../assets/y2k_star.png";
import logoWhite from "../../assets/y2k_star_white.png";
import MarqueeDemo from "@/components/custom/Marquee/Marquee";
import chevronRight from "../../assets/mdi_chevron-right.svg";
import stars from "../../assets/stars.png";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Produto 1",
      price: 29.9,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Produto 1",
      price: 29.9,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      name: "Produto 1",
      price: 29.9,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      name: "Produto 1",
      price: 29.9,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const events = [
    {
      id: 1,
      name: "Nome do Evento",
      description: "Essa é uma descrição do evento Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      name: "Nome do Evento",
      description: "Essa é uma descrição do evento Lorem ipsum dolor sit amet.",
    },
    {
      id: 3,
      name: "Nome do Evento",
      description: "Essa é uma descrição do evento Lorem ipsum dolor sit amet.",
    },
    {
      id: 4,
      name: "Nome do Evento",
      description: "Essa é uma descrição do evento Lorem ipsum dolor sit amet.",
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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

      {/* Store Section */}
      <section className="mx-auto max-w-screen-2xl px-16 pt-8 pb-24">
        <h2 className="text-5xl font-orbitron-bold mb-8">RUA STORE</h2>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div className="bg-white border border-gray-200 w-full max-w-sm">
              {/* Image container with aspect ratio */}
              <div className="relative bg-gray-200 aspect-[6/3] border border-black">
                <img
                  src="https://placehold.co/600x400/EEE/31343C"
                  alt={product.name}
                  className="w-full h-[full] object-cover"
                />
                <button className="absolute top-2 right-0 bg-transparent hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Content container with padding */}
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
                <button className="w-full bg-black text-white py-2.5 text-center hover:bg-gray-800 transition-colors">
                  Ver na loja
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex flex-row justify-between">
          <div className="absolute">
            <img src={logoWhite} className="w-40 h-40 mt-4" />
          </div>

          <img src={chevronRight} className="w-20 h-20 mt-4" />
        </div> */}

        <div className="relative flex flex-row justify-between items-start">
          <div className="absolute left-0">
            <img src={logoWhite} className="w-40 h-40 mt-4" />
          </div>
          <div className="absolute right-0">
            <img src={chevronRight} className="w-16 h-16 mt-4" />
          </div>
        </div>
      </section>
      {/* Events Section */}
      <div className="bg-gray-100 border border-y-black pb-14">
        <section className="mx-auto max-w-screen-2xl px-16 py-8">
          <h2 className="text-5xl font-orbitron-bold mb-8 flex justify-end items-center">
            EXIBIÇÕES & EVENTOS
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {events.map((event) => (
              <div className="relative bg-gray-100 w-full max-w-screen overflow-hidden shadow-lg min-h-[400px]">
                <img
                  src="https://scontent.fplu41-1.fna.fbcdn.net/v/t1.6435-9/64508182_2312031355509716_759115429250596864_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0327a3&_nc_ohc=LL_oltatlosQ7kNvgFdOodQ&_nc_zt=23&_nc_ht=scontent.fplu41-1.fna&_nc_gid=AqbE-9K_HsrivdYc4aMvOHW&oh=00_AYASzAYQoTquQu_gmJW-ZbzysgZHnMUlTV352PQ_BrjeLw&oe=674E1867"
                  alt="Event Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 brightness-[0.4]"
                />
                <div className="relative p-8 flex flex-col justify-between h-full text-white">
                  <div>
                    <h3 className="text-2xl font-orbitron-medium mb-4">
                      Nome do Evento
                    </h3>
                    <p className="text-sm ">
                      Essa é uma descrição do evento. Lorem ipsum dolor sit
                      amet.
                    </p>
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

      {/* Latest Collections */}
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

        <button className="w-[100vh] bg-black text-black px-3 py-2 mt-8">
          <p className="text-lg font-orbitron-medium text-white text-center">
            CONFIRA
          </p>
        </button>
      </div>
    </div>
  );
};

export default Home;
