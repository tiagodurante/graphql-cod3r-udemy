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

  type Query {
    horaAtual: Date
    usuarioLogado: Usuario
  }
`;

const resolvers = {
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
        salario: 1234.56,
        vip: true
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
