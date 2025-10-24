function Comprar({ produtos, adicionarAoCarrinho, usuario, excluirProduto }) {
  return (
    <div className="produtos">
      {produtos.map((produto) => (
        <div key={produto.id} className="produto-card">
          <img src={produto.imagem} alt={produto.nome} />
          <h3>{produto.nome}</h3>
          <p>R$ {produto.preco.toFixed(2)}</p>
          <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar</button>

          {usuario && (
            <button
              className="btn-excluir"
              onClick={() => excluirProduto(produto.id)}
            >
              Excluir
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comprar;
