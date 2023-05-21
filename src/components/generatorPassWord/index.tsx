import React, { useEffect, useState } from "react";
import styles from "./generator.module.scss";
import { MdAddBox } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

type senhaModel = {
  id: string;
  nomeSenha: string;
  senha: string;
};

const Generator = () => {
  const [createId, setCreateId] = useState<boolean>(false);
  const [idGerado, setIdGerado] = useState<string>("");
  const [nomeSenha, setNomeSenha] = useState<string>("");
  const [listaSenha, setListaSenha] = useState<senhaModel[]>([]);
  const [exibirSenha, setExibirSenha] = useState<{ [key: string]: boolean }>(
    {}
  );

  useEffect(() => {
    if (!createId) {
      return;
    }
    gerarId();
  }, [createId]);

  const gerarId = () => {
    if (!nomeSenha || nomeSenha === "") {
      Toast.fire({
        icon: "warning",
        title: "Atenção! Prencha o nome",
      });
      setCreateId(false);
      return;
    }

    let novoId = uuidv4();
    novoId = novoId.replaceAll("-", "").slice(0, 15);
    setIdGerado(novoId);

    let tempSenha: senhaModel = {
      id: novoId,
      nomeSenha,
      senha: novoId,
    };

    let lista = listaSenha;
    lista.push(tempSenha);

    setListaSenha(lista);

    Toast.fire({
      icon: "success",
      title: "Senha gerada com sucesso!",
    });
    setCreateId(false);
    setNomeSenha("");
    setIdGerado("");
  };

  const handleDeletList = async (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await Swal.fire({
      title: "Você tem certeza que deseja excluir a senha?",
      text: "Depois da exclusão ela não podera ser recuperda!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar essa senha!",
      cancelButtonText: "Não, cancelar!",
    });

    if (result.isConfirmed) {
      const novaListaSenha = listaSenha.filter((lista) => lista.id !== id);
      setListaSenha(novaListaSenha);
      Swal.fire("Deletada!", "Sua senha foi deletada com sucesso", "success");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        "Cancelado",
        "Suas senhas estão a salvo! :)",
        "error"
      );
    }
  };

  const handleToggleExibirSenha = (id: string) => {
    setExibirSenha((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const onDelet = () => {
    setNomeSenha("");
  };

  return (
    <>
      <div className={styles.mainGeneratorPassword}>
        <div className={styles.addingPassword}>
          <button
            type="button"
            className={styles.btnMdAddBox}
            data-bs-toggle="modal"
            data-bs-target="#generatorPassWord"
          >
            <MdAddBox className={styles.MdAddBox} size={65} />
          </button>
          <h1>Gerar Senha!</h1>
        </div>
        {listaSenha.map((lista) => (
          <>
            <div className={styles.mainLista}>
              <div className={styles.divListaPassword}>
                <div> - {lista.nomeSenha} </div>
                <div>
                  {exibirSenha[lista.id] ? (
                    <div>Senha: {lista.senha}</div>
                  ) : (
                    <div>Senha: ***************</div>
                  )}
                </div>
              </div>
              <div>
                <button
                  className={styles.btnEye}
                  onClick={() => handleToggleExibirSenha(lista.id)}
                >
                  {exibirSenha[lista.id] ? (
                    <FaEye className={styles.eye} size={35} />
                  ) : (
                    <FaEyeSlash className={styles.eye} size={35} />
                  )}
                  {""}
                </button>
              </div>
              <div>
                <button
                  className={styles.btnTrash}
                  onClick={() => handleDeletList(lista.id)}
                >
                  <BsFillTrashFill
                    className={styles.BsFillTrashFill}
                    size={35}
                  />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <!-- Modal I.--> */}
      <div
        className="modal fade"
        id="generatorPassWord"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Gerador De Senha
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className={styles.divModal}>
                <span className={styles.nameModal}>Coloque o nome:</span>
              </div>
              <input
                className="form-control"
                type="text"
                value={nomeSenha || ""}
                onChange={(e) => setNomeSenha(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onDelet}
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => setCreateId(true)}
              >
                Gerar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  <!-- Modal F.--> */}
    </>
  );
};

export default Generator;
