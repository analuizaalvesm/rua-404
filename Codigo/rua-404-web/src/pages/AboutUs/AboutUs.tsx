import chevron from "../../assets/images/y2k-chevron-black.png";
import bwchevron from "../../assets/images/y2k-chevron-bw.png";
import stars from "../../assets/images/stars.png";
import CloseIcon from "../../assets/images/close_windows.png";
import MinimizeIcon from "../../assets/images/minimize_windows.png";
import MaximizeIcon from "../../assets/images/maximize_windows.png";
import styles from "./AboutUs.module.css";
import MarqueeDemo from "@/components/custom/Marquee/Marquee";

const AboutUs = () => {
  const members = [
    {
      id: 1,
      name: "Lucas Pires",
      role: "Idealizador & Desenvolvedor",
      description: "Iniciou sua carreira de programador em 2018 e hoje atua com desenvolvimento mobile. É entusiasta de realidade aumentada e idealiza produtos que unem arte e tecnologia.",
      image: "https://i.postimg.cc/W3rdnTbH/433317805-3824953447776347-5350987117070313789-n.jpg"
    },
    {
      id: 2,
      name: "Fred Bernardes",
      role: "Motion Designer",
      description: "Começou no design em 2015, tendo foco em composição de vídeo mais voltado para animação gráfica. Hoje, trabalha como Motion Designer e é um dos fundadores do Rua 4.0.4.",
      image: "https://i.postimg.cc/NfG1g20G/279515636-3101708033412037-750311692102704057-n.jpg"
    },
    {
      id: 3,
      name: "Lucas Zatta",
      role: "Artista & Desenvolvedor",
      description: "Artista visual e programador, Zatta é apaixonado por arte urbana e tecnologia. No tempo livre, gosta de criar experiências visuais imersivas e interativas para o Rua 4.0.4.",
      image: "https://i.postimg.cc/5yV6KTXN/376857149-760134895881446-3542992875454547472-n.jpg"
    }
  ];




  const collaborations = [
    {
      id: 1,
      name: "NOID x RUA 4.0.4",
      description: "Parceria que uniu arte digital e intervenção urbana em um projeto inovador de stickers e mídia experimental.",
      logo: "https://i.postimg.cc/1tdpRw9V/imagem-2024-11-30-225108548.png"
    },
    {
      id: 2,
      name: "Caxin x RUA 4.0.4",
      description: "Colaboração que expandiu os limites da arte de rua através de técnicas mistas de design e street art.",
      logo: "https://i.postimg.cc/wMV6H88W/439959573-278219802010402-6715365152263004301-n.jpg"
    }
  ];

  const productHighlights = [
    {
      id: 1,
      name: "Sticker Packs",
      description: "Coleções exclusivas que capturam a essência da arte urbana digital.",
      quantity: "+30 designs únicos"
    },
    {
      id: 2,
      name: "Prints Artísticos",
      description: "Arte em papel de alta qualidade, capturando momentos e intervenções urbanas.",
      quantity: "+20 edições limitadas"
    },
    {
      id: 3,
      name: "Pins & Buttons",
      description: "Acessórios exclusivos para quem quer levar a arte urbana para onde for.",
      quantity: "+5 modelos exclusivos"
    }
  ];

  const Banner = () => {
    return (
      <div className="w-full bg-black py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="py-14">
              <h3 className="text-6xl text-center font-orbitron-bold text-white tracking-wider uppercase">
                <div className={`${styles.glitch}-wrapper relative`}>
                  <div className={styles.glitch} data-text="QUEM SOMOS?">
                    QUEM SOMOS?
                  </div>
                </div>
              </h3>
              <p className="text-gray-600 text-center text-lg text-white leading-relaxed mt-8 px-32">
                Rua 4.0.4 é mais do que um coletivo. Somos uma plataforma que reimagina a arte urbana através da tecnologia,
                criando pontes entre o digital e o físico, o local e o global, o tradicional e o experimental.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className='bg-black'>
        <section className="bg-black mx-auto max-w-screen-2xl px-16 py-8">
          <Banner />
          <div className="relative flex flex-row justify-between items-start">
            <div className="absolute right-0">
              <img src={bwchevron} className="mt-[7px]" />
            </div>
          </div>
        </section>
      </div>
      <section className="mx-auto max-w-screen-2xl px-16 py-16">

        <h2 className="text-5xl font-orbitron-bold mb-8">NOSSA HISTÓRIA</h2>
        <div className="grid grid-cols-2 gap-12">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fundada em 2020, a Rua 4.0.4 nasceu da intersecção entre arte urbana e tecnologia digital.
              Nosso objetivo é transformar espaços urbanos em telas interativas, onde cada intervenção
              é uma narrativa, cada sticker uma mensagem, cada print uma experiência.
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Acreditamos que a arte não precisa estar confinada em galerias. Ela deve ser viva,
              dinâmica e acessível. Por isso, levamos nossa arte para as ruas, muros, e agora,
              para plataformas digitais, criando um ecossistema onde a criatividade não conhece limites.
            </p>
          </div>
        </div>

        <div className="relative flex flex-row justify-between items-start">
          <div className="absolute left-0">
            <img src={chevron} className="mt-10" />
          </div>
        </div>
      </section>

      <div className="bg-gray-100 border border-y-black pb-14">
        <section className="mx-auto max-w-screen-2xl px-16 py-8">
          <h2 className="text-5xl font-orbitron-bold mb-8 flex justify-end items-center">
            NOSSOS ARTISTAS
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-black w-full"
              >
                <div className="relative bg-gray-200 aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 border border-t-black">
                  <h3 className="text-2xl font-orbitron-semibold">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 font-orbitron-medium text-md mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-700">
                    {member.description}
                  </p>
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
        <h2 className="text-5xl font-orbitron-bold mb-8">NOSSAS COLLABS</h2>
        <div className="grid grid-cols-2 gap-6">
          {collaborations.map((collab) => (
            <div
              key={collab.id}
              className="border-2 border-black font-bold text-xl shadow-lg p-0 flex flex-col bg-white"
            >
              <div className="flex items-center justify-between bg-gray-200 border-b-2 border-black">

                <p className="text-xs font-orbitron-bold text-gray-800 uppercase pl-4">RUA.EXE</p>
                <div className="flex">
                  <div className="bg-white px-2 py-2 flex justify-center items-center border-l-2 border-black hover:bg-black group transition-colors">
                    <img src={MinimizeIcon} alt="Minimize" className="group-hover:invert" />
                  </div>
                  <div className="bg-white px-2 py-2 flex justify-center items-center border-l-2 border-black hover:bg-black group transition-colors">
                    <img src={MaximizeIcon} alt="Maximize" className="group-hover:invert" />
                  </div>
                  <div className="bg-white px-2 py-2 flex justify-center items-center border-l-2 border-black hover:bg-black group transition-colors">
                    <img src={CloseIcon} alt="Close" className="group-hover:invert" />
                  </div>
                </div>

              </div>

              <div className="p-6 flex flex-col justify-between">
                <div className="flex flex-row space-x-8 items-center">
                  <img
                    src={collab.logo}
                    alt={collab.name}
                    className="h-80 w-80 object-cover flex-shrink-0"
                  />
                  <div className="pr-4">
                    <h3 className="text-2xl font-orbitron-medium mb-4 text-center">
                      {collab.name}
                    </h3>
                    <p className="text-md font-regular text-justify">
                      {collab.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <button className="font-orbitron-bold mt-6 border bg-white border-2 border-black w-full py-2 hover:bg-black hover:text-white transition-colors">
                    Ver Projeto
                  </button>
                  <button className="font-orbitron-bold mt-6 bg-black text-white w-full py-2 hover:bg-gray-800 transition-colors">
                    Visitar parceiro
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-black pt-12 pb-16">
        <section className="mx-auto max-w-screen-2xl px-16">
          <h2 className="text-5xl font-orbitron-bold mb-8 text-right text-white">
            NOSSOS PRODUTOS
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {productHighlights.map((product) => (
              <div
                key={product.id}
                className="border border-white p-6"
              >
                <h3 className="text-3xl font-orbitron-bold text-white mb-4">
                  {product.name}
                </h3>
                <p className="text-gray-100 mb-6">
                  {product.description}
                </p>
                <div className="border-t-2 border-dashed border-white pt-4 text-white">
                  <p className="text-xl font-orbitron-medium">
                    {product.quantity}
                  </p>
                </div>
                <button className="mt-6 w-full border border-black font-orbitron-semibold bg-white text-black py-2 hover:bg-black hover:text-white hover:border hover:border-white transition-colors">
                  Explorar Coleção
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <MarqueeDemo />
    </div>
  );
};

export default AboutUs;