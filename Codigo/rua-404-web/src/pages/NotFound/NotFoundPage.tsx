import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex items-center h-[80vh] dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-xl text-center">
          <h2 className="mb-8 font-orbitron-extrabold text-9xl dark:text-gray-400">
            <div className={`${styles.glitch}-wrapper relative`}>
              <div className={styles.glitch} data-text="4.0.4">
                4.0.4
              </div>
            </div>
          </h2>
          <p className="text-2xl font-orbitron-semibold md:text-4xl">
            P4GE N0T F0UND
          </p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            Opa, se perdeu? Não se preocupe, acontece com todo mundo. Vamos te
            levar de volta ao caminho certo.
          </p>
          <button
            rel="noopener noreferrer"
            onClick={() => navigate("/")}
            className="px-4 py-2 font-medium rounded text-white"
          >
            <div className="flex flex-row items-center gap-2">
              <FaArrowLeft color="#fff" size={14} />
              Página inicial
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
