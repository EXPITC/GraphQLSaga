const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'HelloGraphQL',
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => 'Hello GraphQL!',
      },
    }),
  }),
});

app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  }),
);

const port = 5000;
app.listen(port, () => console.log('http:localhost:' + port));
