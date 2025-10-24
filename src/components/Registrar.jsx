import React, { useState } from "react";

function Registrar({ produtos, setProdutos, setTela }) {
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    imagem: "",
  });

  // Função para lidar com upload de imagem local
  const handleImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tiposPermitidos = ["image/jpeg", "image/png"];
    if (!tiposPermitidos.includes(file.type)) {
      alert("Apenas imagens JPG ou PNG são permitidas!");
      return;
    }

    const tamanhoMax = 2 * 1024 * 1024; // 2MB
    if (file.size > tamanhoMax) {
      alert("A imagem deve ter no máximo 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setNovoProduto({ ...novoProduto, imagem: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!novoProduto.nome || !novoProduto.preco) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo = {
      id: produtos.length + 1,
      nome: novoProduto.nome,
      preco: parseFloat(novoProduto.preco),
      imagem: novoProduto.imagem || "https://via.placeholder.com/150",
    };

    setProdutos([...produtos, novo]);
    setNovoProduto({ nome: "", preco: "", imagem: "" });
    alert("Produto adicionado com sucesso!");
  };

  return (
    <div className="tela-registrar">
      <h2>Registrar Novo Produto</h2>

      <div className="form-registro">
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, preco: e.target.value })
          }
        />

        <input type="file" accept="image/*" onChange={handleImagem} />

        {novoProduto.imagem && (
          <div className="preview">
            <p>Pré-visualização:</p>
            <img src={novoProduto.imagem} alt="Prévia" />
          </div>
        )}

        <div className="botoes-acao">
          <button onClick={handleAdd}>Salvar Produto</button>
          <button className="btn-voltar" onClick={() => setTela("comprar")}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registrar;
