const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    nome: "Tiago",
    email: "tiagodurante@outlook.com.br",
    idade: "23"
  },
  {
    id: 2,
    nome: "Mayko",
    email: "mkioschi@outlook.com.br",
    idade: "24"
  },
  {
    id: 3,
    nome: "Felipe",
    email: "felipebock@outlook.com.br",
    idade: "25"
  }
];

const typeDefs = gql`
  scalar Date
  # Pontos de entrada da sua API
  type Usuario {
    id: Int!
    nome: String!
    email: String!
    idade: Int
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
    numerosMegaSena: [Int]!
    usuarios: [Usuario]
    usuario(id: Int): Usuario
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(parent) {
      if (parent.desconto) {
        return (1 - parent.desconto / 100) * parent.preco;
      }
      return parent.preco;
    }
  },
  Usuario: {
    // salario(usuario) {
    //   return usuario.salario_real;
    // }
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
        idade: "23"
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Café 3 Corações 250g",
        preco: 4.99,
        desconto: 10
      };
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      return Array(6)
        .fill(0)
        .map(n => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
    },
    usuarios() {
      return users;
    },
    usuario(_, args) {
      const sels = users.filter(u => u.id === args.id);
      return sels ? sels[0] : null;
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
