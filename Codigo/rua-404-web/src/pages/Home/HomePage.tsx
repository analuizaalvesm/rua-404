/* eslint-disable @typescript-eslint/no-explicit-any */

import { Heart } from "lucide-react";
import Loader from "@/components/admin/components/Loader";
import logoWhite from "../../assets/images/y2k_star_white.png";
import MarqueeDemo from "@/components/custom/Marquee/Marquee";
import chevronRight from "../../assets/icons/mdi_chevron-right.svg";
import stars from "../../assets/images/stars.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BannerFormData, EventFormType } from "../Admin/CMS/types";
import { products, events } from "./mockElements";
import axios from "axios";
import Banner from "./Components/Banner";
import Collections from "./Components/Collections";
import Collabs from "./Components/Collabs";

type Collab = {
  id: number;
  name: string;
  texto: string;
};

type Collection = {
  id: number;
  name: string;
  texto: string;
};

const backupCollections = [
  {
    id: 1,
    name: "última collab",
    texto: "CAXIN",
  },
  {
    id: 2,
    name: "última coleção",
    texto: "4.0.4 ORIGINALS",
  },
  {
    id: 3,
    name: "último evento",
    texto: "BH CONECTA",
  },
];

const backupCollabs = [
  {
    id: 1,
    name: "10 stickers",
    texto:
      "Mais de 10 modelos de adesivos diferentes para você estilizar suas coisas e a cidade.",
  },
  {
    id: 2,
    name: "8 prints",
    texto:
      "Mais de 8 modelos de prints criativos para você decorar seu cantinho com a arte do Rua.",
  },
  {
    id: 3,
    name: "5 parcerias com artistas de BH",
    texto:
      "Parcerias como Caxin, NOID, BH Conecta, entre outros artistas influentes de BH.",
  },
];

const Home = () => {
  const [eventList, setEventList] = useState<EventFormType[]>([]);
  const [banner, setBanner] = useState<BannerFormData[]>([]);
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/cms/listar-eventos`
      );
      setEventList(response.data);
    } catch {
      setEventList(events);
    } finally {
      setLoading(false);
    }
  };

  const fetchBanner = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/cms/listar-banners`
      );
      setBanner(response.data);
    } catch {
      setBanner([
        {
          id: 1,
          texto: "This is ARTE DE RUA",
          descricao:
            "Onde a tecnologia encontra a arte nas ruas, transformando o urbano em um playground digital. Somos um coletivo que mistura intervenções urbanas e arte multimídia para criar experiências imersivas e únicas. Conecte-se com o futuro da arte, onde cada projeto é uma nova interação entre o digital e o real.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollections = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/cms/listar-colecoes"
      );
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      setCollections(backupCollections);
      console.error("Erro ao buscar dados:", error);
    }
  };

  const fetchCollabs = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/cms/listar-collabs"
      );
      const data = await response.json();
      setCollabs(data);
    } catch (error) {
      setCollabs(backupCollabs);
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchBanner();
    fetchCollections();
    fetchCollabs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader inverted />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {banner.length > 0 && (
        <Banner texto={banner[0].texto} descricao={banner[0].descricao} />
      )}
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
                  {product.price.toLocaleString("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                  })}
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
          <div
            className="absolute right-0 cursor-pointer"
            onClick={() => navigate("/store")}
          >
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
            {eventList.map((event) => (
              <div
                key={event.idEvento}
                className="relative bg-gray-100 w-full max-w-screen overflow-hidden shadow-lg min-h-[400px]"
              >
                <img
                  src={event.imgUrl}
                  alt="Event Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 brightness-[0.4]"
                />
                <div className="relative p-8 flex flex-col justify-between h-full text-white">
                  <div>
                    <h3 className="text-2xl font-orbitron-medium mb-4">
                      {event.name}
                    </h3>
                    <p className="text-sm ">{event.texto}</p>
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    className=" px-4 py-3 border border-white bg-transparent text-white text-sm text-center uppercase tracking-wide hover:bg-white hover:text-black transition"
                  >
                    Ver mais
                  </a>
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
      <Collabs collabs={collabs} />
      <Collections collections={collections} />
    </div>
  );
};

export default Home;
