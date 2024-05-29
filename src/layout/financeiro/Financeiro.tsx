import React, { useState, useEffect } from "react";
import {
  IoAddCircleOutline,
  IoCamera,
  IoCashOutline,
  IoCreate,
  IoPerson,
  IoSearch,
  IoTrash,
} from "react-icons/io5";
import "../financeiro/Financeiro.css";
import FinancialDoughnut from "../../components/charts/FinancialDoughnut.tsx";
import axios from "axios";
import FinancialColumnChart from "../../components/charts/FinancialColumnChart.tsx";
import FinancialLineChart from "../../components/charts/FinancialLineChart.tsx";
import { FaCheckSquare, FaTrash } from "react-icons/fa";

interface Despesa {
  nome: string;
  tipo: string;
  descricao: string;
  valor: number;
}

const Financeiro = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const expenseIcons: { [key: string]: string } = {
    Salario: "fas fa-dollar-sign",
    Aluguel: "fas fa-building",
    Fornecedor: "fas fa-truck",
    Imposto: "fas fa-money-bill-alt",
    Manutencao: "fas fa-tools",
  };

  const expenseColors: { [key: string]: string } = {
    Salario: "#388E3C",
    Aluguel: "#1B2947",
    Fornecedor: "#C62828",
    Imposto: "#FFC107",
    Manutencao: "#5B7FFF",
  };

  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/v3/despesas");
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };

    fetchDespesas();
  }, []);

  const adicionarDespesa = () => {
    
  };

  const handleDelete = (despesa: any) => async () => {
    try {
      // Faz a requisição DELETE para a rota da API para excluir o despesas
      await axios.delete(`http://localhost:4000/v3/despesas/${despesa.nome}`);
      console.log("despesa excluído com sucesso!");
      // Atualiza a lista de despesas após a exclusão
      const updatedDespesas = despesas.filter((d) => d.nome !== despesa.nome);
      setDespesas(updatedDespesas);
      //setFiltroPesquisa(''); // Limpar o filtro de pesquisa após a exclusão
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
    }
  };

  const handleOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleEdit = (despesa: any) => {
    // Define os dados do despesa selecionado para edição
    console.log(despesa);
    //setDespesaParaEditar(despesa); // Aqui você está definindo os dados do região selecionado para edição
  };

  return (
    <>
      {showModal && (
        <div className="Modal-Add">
          <div className="container-Add">
            <div id="header-modal">
              <h4 className="modal-title">Adicionar Despesa</h4>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="Add-Item-container">
              <div className="input-item input-single">
                <span>
                  <label htmlFor="name-item">Nome:</label>
                  <input
                    type="text"
                    name="name-item"
                    className="full-item"
                    id="name-item"
                  />
                </span>
              </div>

              <div className="input-item input-mult">
                <span>
                  <label htmlFor="data-nascimento-item">
                    Data da despesa:
                  </label>
                  <input
                    type="text"
                    name="data-nascimento-item"
                    className="full-item"
                    id="data-nascimento-item"
                  />
                </span>
                <span>
                  <label htmlFor="local-atuacao-item">Tipo:</label>
                  <input
                    type="text"
                    name="local-atuacao-item"
                    className="full-item"
                    id="local-atuacao-item"
                  />
                </span>
              </div>

              <div className="input-item input-single">
                <span>
                  <label htmlFor="email-item">Valor:</label>
                  <input
                    type="text"
                    name="email-item"
                    className="full-item"
                    id="email-item"
                  />
                </span>
              </div>             

              <div className="input-item input-single">
                <span>
                  <label htmlFor="description-item">Descrição:</label>
                  <textarea
                    type="text"
                    name="description-item"
                    className="desc-staff"
                    id="description-item"
                  />
                </span>
              </div>                    
              
              <button id="add-staff-Btn" onClick={adicionarDespesa}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="financial-container">
        <header id="financial-header">
          <h1>Financeiro</h1>
        </header>

        <main id="financial-main">
          <section className="debts-container">
            <div className="debts-left">
              <div className="debts-card">
                <article className="dbt-card-container">
                  <circle className="dbt-circ circ1">
                    <IoPerson className="debt-icon" />
                  </circle>
                  <div className="dbt-card card-1">
                    <h1>340K</h1>
                    <p>
                      <strong>Dívidas</strong> de clientes
                    </p>
                  </div>
                </article>

                <article className="dbt-card-container">
                  <circle className="dbt-circ circ2">
                    <IoCashOutline className="debt-icon" />
                  </circle>
                  <div className="dbt-card card-2">
                    <h1>500K</h1>
                    <p>
                      em <strong>Dívidas</strong> pendentes
                    </p>
                  </div>
                </article>
              </div>

              <div className="selection-container-debt">
                <select
                  id="filter-expense"
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                  <option value="">Todos</option>
                  {categorias.map((categoria, index) => (
                    <option key={index} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <section id="container-table-debts">
                <table id="table-prod" className="table-debts">
                  <thead className="head-list-fin" style={{backgroundColor: 'var(--primary-color)'}}>
                    <tr style={{ paddingBlock: ".5rem" }}>
                      <td>Cliente</td>
                      <td>Data da Compra</td>
                      <td>Valor</td>
                      <td className="action-space">Ações</td>
                    </tr>
                  </thead>
                  <tbody className="body-list-prod debt" style={{gap: '5px'}}>
                    <tr>
                      <td>
                        <h3 data-toggle="tooltip" title="Picolé sem cobertura">
                          Mario
                        </h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="07/04/2024">
                          07/04/2024
                        </h3>
                      </td>
                      <td>
                        <h3 data-toggle="tooltip" title="Cartão(debito)">
                          10K
                        </h3>
                      </td>
                      <td
                        className="action-btns"
                        style={{ display: "flex", gap: "5px" }}
                      >
                        <button
                          className="edit"
                          style={{
                            padding: ".6rem .8rem",
                            height: "2.5rem",
                            width: "2.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => handleEdit()}
                        >
                          <FaCheckSquare />
                        </button>
                        <button
                          className="delete"
                          style={{
                            padding: ".6rem .8rem",
                            height: "2.5rem",
                            width: "2.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={handleDelete()}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>

            <div className="debts-right">
              <div className="debt-chart">
                <FinancialDoughnut />
              </div>
              <div className="debt-forms">
                <div className="ranking">
                  <p className="debt-title">Nomes no SPC</p>
                  <ul>
                    <li style={{ width: "300px", background: "none" }}>
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>Dinheiro</p>
                        <div
                          className="scale-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{ width: `50%`, background: "#2ecc71" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: "300px", background: "none" }}>
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>Pix</p>
                        <div
                          className="scale-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{ width: `50%`, background: "#3498db" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: "300px", background: "none" }}>
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>
                          Cartão (Crédito)
                        </p>
                        <div
                          className="scale-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{ width: `50%`, background: "red" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: "300px", background: "none" }}>
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>Boleto</p>
                        <div
                          className="scale-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{ width: `50%`, background: "orange" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: "300px", background: "none" }}>
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>Cheque</p>
                        <div
                          className="scale-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{ width: `50%`, background: "purple" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li
                      style={{
                        width: "300px",
                        background: "none",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>
                          Transferência
                        </p>
                        <div className="scale-container">
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{ width: `50%`, background: "#1abc9c" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li style={{ width: "300px", background: "none" }}>
                      <div className="product-name">
                        <p style={{ color: "var(--black-color)" }}>Em Dívida</p>
                        <div
                          className="scale-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div className="product-scale">
                            <div
                              className="scale"
                              style={{
                                width: `50%`,
                                background: "var(--black-color)",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="debt-ranking">
            <header className="debt-ranking-header">
              <h1>
                Olipíadas financeiras: Competindo pelo Ouro na categoria dívida.
              </h1>
            </header>
            <div className="columns-debt">
              <div className="column-dbt">
                <h3>Maiores dívidas do mês</h3>
                <FinancialColumnChart />
              </div>
              <div className="column-dbt">
                <h3>Maiores períodos dívidas do mês</h3>
                <FinancialColumnChart />
              </div>
            </div>
          </section>

          <section id="expense-types">
            <div className="dbt-forms">
              <div className="ranking">
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Dinheiro</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `50%`, background: "#2ecc71" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Pix</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `50%`, background: "#3498db" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>
                        Cartão (Crédito)
                      </p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `30%`, background: "red" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Boleto</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `20%`, background: "orange" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Cheque</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `10%`, background: "purple" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li
                    style={{
                      width: "300px",
                      background: "none",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>
                        Transferência
                      </p>
                      <div className="scale-container">
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{ width: `30%`, background: "#1abc9c" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li style={{ width: "300px", background: "none" }}>
                    <div className="product-name">
                      <p style={{ color: "var(--black-color)" }}>Em Dívida</p>
                      <div
                        className="scale-container"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="product-scale">
                          <div
                            className="scale"
                            style={{
                              width: `20%`,
                              background: "var(--black-color)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="expense-line">
              <div className="chart-line-exp">
                <FinancialLineChart />
              </div>
            </div>
          </section>

          <section id="exp-form">
            <header>
              <h1>Informe suas despesas</h1>
            </header>

            <section id="search-expense">
              <div id="search-bar">
                <input
                  type="search"
                  id="search-exp"
                  placeholder="Pesquisar despesa"
                  aria-label="Buscar"
                />
                <i id="search-icon">
                  <IoSearch id="icon-exp" />
                </i>
              </div>

              <select
                id="filter-expense"
                value={selectedOption}
                onChange={handleOptionSelect}
              >
                <option value="">Todos</option>
                <option value="opcao1">Salário</option>
                <option value="opcao2">Aluguel</option>
                <option value="opcao3">Fornecedor</option>
                <option value="opcao4">Imposto</option>
                <option value="opcao5">Manutenção</option>
              </select>
            </section>

            <p id="result-expense">Resultados ({despesas.length})</p>

            <section id="exp-cards">
              <button
                className="exp-card"
                id="add-exp-card"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <i>
                  <IoAddCircleOutline />
                </i>
                <p>Adicionar despesa</p>
              </button>

              {despesas
                .filter(
                  (expense) =>
                    selectedOption === "" || expense.tipo === selectedOption
                )
                .map((expense, index) => (
                  <button key={index} className="exp-card">
                    <span className="fa-stack">
                      <div className="stack-container">
                        <i
                          className="fas fa-square"
                          style={{ color: expenseColors[expense.tipo] }}
                        ></i>
                        <i className="fas fa-circle"></i>
                        <i
                          className={expenseIcons[expense.tipo]}
                          style={{ color: expenseColors[expense.tipo] }}
                        ></i>
                      </div>
                    </span>
                    <p>{expense.nome}</p>
                    <p className="exp-desc">{expense.descricao}</p>
                    <p className="exp-desc">R$ {expense.valor}</p>
                    <div className="manager-btn">
                      <div>
                        <button className="edit-item item-mng">
                          <IoCreate id="edit-pen" />
                        </button>
                      </div>
                      <div>
                        <button
                          className="delete-item item-mng"
                          onClick={handleDelete(expense)}
                        >
                          <IoTrash id="edit-trash" />
                        </button>
                      </div>
                    </div>
                  </button>
                ))}
            </section>
          </section>
        </main>
      </div>
    </>
  );
};

export default Financeiro;
