import { useState } from "react";
import Comprar from "./components/Comprar";
import Registrar from "./components/Registrar";
import logo from "./assets/logo.png";
import picanhaImg from "./assets/picanha.png";
import alcatraImg from "./assets/alcatra.png";
import frangoImg from "./assets/frango.png";
import "./App.css";

function App() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Picanha", preco: 69.99, imagem: picanhaImg },
    { id: 2, nome: "Alcatra", preco: 49.99, imagem: alcatraImg },
    { id: 3, nome: "Frango Assado", preco: 40.0, imagem: frangoImg },
  ]);

  const [tela, setTela] = useState("comprar");
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [loginData, setLoginData] = useState({ nome: "", senha: "" });
  const [carrinho, setCarrinho] = useState([]);
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  // Login
  const usuariosValidos = ["marcia", "kellisson","teste"];
  const handleLogin = () => {
    const nomeValido = usuariosValidos.includes(loginData.nome.toLowerCase());
    const senhaValida = loginData.senha === "123";

    if (nomeValido && senhaValida) {
      setUsuario(loginData.nome);
      setMostrarLogin(false);
      setLoginData({ nome: "", senha: "" });
      alert("Login realizado com sucesso!");
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  // Logout
  const handleLogout = () => {
    setUsuario(null);
    setTela("comprar");
  };

  // Adicionar ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  // Remover item do carrinho
  const removerDoCarrinho = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  // Finalizar compra
  const finalizarCompra = () => {
    if (carrinho.length === 0) return;
    setCarrinho([]);
    setCompraFinalizada(true);
    setTela("finalizacao");
  };

  // Voltar ao início
  const voltarInicio = () => {
    setCompraFinalizada(false);
    setTela("comprar");
  };

  return (
    <div className="app">
      <header>
        <img src={logo} alt="Logo Açougue" className="logo" />
        <nav>
          {usuario && (
            <button
              className={tela === "registrar" ? "active" : ""}
              onClick={() => setTela("registrar")}
            >
              Registrar Produto
            </button>
          )}
        </nav>
      </header>

      <main>
        <div className="container">
          {/* Tela de compra */}
          {tela === "comprar" && !compraFinalizada && (
            <Comprar produtos={produtos} adicionarAoCarrinho={adicionarAoCarrinho} />
          )}

          {/* Tela de registro */}
          {tela === "registrar" && usuario && (
            <Registrar produtos={produtos} setProdutos={setProdutos} setTela={setTela} />
          )}

          {/* Tela de carrinho */}
          {tela === "carrinho" && (
            <div className="carrinho">
              <h3>Carrinho</h3>
              {carrinho.length === 0 ? (
                <p>Seu carrinho está vazio 😅</p>
              ) : (
                carrinho.map((item, index) => (
                  <div className="carrinho-item" key={index}>
                    <img src={item.imagem} alt={item.nome} />
                    <div className="carrinho-info">
                      <h4>{item.nome}</h4>
                      <p>R$ {item.preco.toFixed(2)}</p>
                    </div>
                    <button
                      className="btn-remover"
                      onClick={() => removerDoCarrinho(index)}
                    >
                      X
                    </button>
                  </div>
                ))
              )}

              <div className="carrinho-total">Total: R$ {total.toFixed(2)}</div>

              <div className="botoes-carrinho">
                <button className="btn-voltar" onClick={() => setTela("comprar")}>
                  Voltar
                </button>
                <button className="btn-finalizar" onClick={finalizarCompra}>
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}

          {/* Tela de finalização */}
          {tela === "finalizacao" && (
            <div className="tela-finalizacao">
              <h2>Compra Finalizada!</h2>
              <p>Obrigado por comprar conosco 🥩</p>
              <button className="btn-voltar" onClick={voltarInicio}>
                Voltar ao Início
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Botão “Ir ao Carrinho” visível apenas na tela de produtos */}
      {tela === "comprar" && carrinho.length > 0 && (
        <button className="btn-carrinho" onClick={() => setTela("carrinho")}>
          Ir ao Carrinho ({carrinho.length})
        </button>
      )}

      <footer>
        <div className="info-contato">
          <p>Av Nossa Senhora de Fátima, 1467</p>
          <p>Delivery: 3295-5938 | (19) 99958-0095</p>
        </div>

        {!usuario ? (
          <p className="login-text" onClick={() => setMostrarLogin(true)}>
            Login
          </p>
        ) : (
          <p className="login-text" onClick={handleLogout}>
            Sair ({usuario})
          </p>
        )}
      </footer>

      {/* Modal de login */}
      {mostrarLogin && (
        <div className="modal-fundo" onClick={() => setMostrarLogin(false)}>
          <div className="modal-login" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Usuário"
              value={loginData.nome}
              onChange={(e) =>
                setLoginData({ ...loginData, nome: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginData.senha}
              onChange={(e) =>
                setLoginData({ ...loginData, senha: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
