import React, { useRef } from "react";
import styles from "./geradorDeSenhas.module.scss";
import { AiFillSetting } from "react-icons/ai";
import TextoMaquinaEscrever from "./maquinaDeEscrever";
import Generator from "../generatorPassWord/index";

const GeradorDeSenhas = () => {
  // função que espera o botão salvar para alterar a imagem de perfil
  function waitForEvent(eventName: string): Promise<Event> {
    return new Promise((resolve) => {
      const eventHandler = (event: Event) => {
        resolve(event);
        document.removeEventListener(eventName, eventHandler);
      };
      document.addEventListener(eventName, eventHandler);
    });
  }

  // Fazendo que o input file apresente a imagem diratamente no site como foto de perfil
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Espera o clique no botão
      await waitForEvent("click");

      const img = imgRef.current;
      if (img) {
        img.src = URL.createObjectURL(e.target.files[0]);
      }
    }
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Configurações de perfil!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Selecione sua foto de perfil:</p>
              <input
                type="file"
                id="imgInput"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => waitForEvent("click")}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal F. */}

      <div className={styles.container}>
        <div className={styles.mainProfile}>
          <div className={styles.imgProfile}>
            <img
              className={styles.imgP}
              ref={imgRef}
              id="imgProfile"
              src=""
              alt=""
            />
          </div>
          <div className={styles.textProfile}>
            <TextoMaquinaEscrever
              texto="Olá, prezado usuário. Seja bem-vindo! Estou aqui para ajudá-lo a gerenciar suas senhas com segurança."
              velocidade={70}
              tamanhoFonte="30px"
            />
          </div>
          <div className={styles.settings}>
            <button
              type="button"
              className={styles.btnSettings}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <AiFillSetting className={styles.grUserSettings} size={55} />
            </button>
          </div>
        </div>
        <Generator />
      </div>
    </>
  );
};

export default GeradorDeSenhas;
