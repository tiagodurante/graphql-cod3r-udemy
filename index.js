const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Pontos de entrada da sua API
  type Query {
    horaAtual: String!
  }
`;

const resolvers = {
  Query: {
    horaAtual() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return String(`${dd}/${mm}/${yyyy}`);
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
