const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date
  # Pontos de entrada da sua API
  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Int
    precoComDesconto: Float
  }

  type Query {
    horaAtual: Date
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(parent) {
      return (1 - parent.desconto / 100) * parent.preco;
    }
  },
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    }
  },
  Query: {
    horaAtual() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Tiago",
        email: "tiagodurante@outlook.com.br",
        idade: "23",
        salario_real: 1234.56,
        vip: true
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Café 3 Corações 250g",
        preco: 4.99,
        desconto: 10
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`EXECUTANDO EM ${url}`);
});
