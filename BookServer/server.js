const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const app = express();

const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' },
];

const books = [
  { id: 1, name: 'Harry Potter and the Camber of Secrets', authorsId: 1 },
  { id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorsId: 1 },
  { id: 3, name: 'Harry Potter and the Goblet of Fire', authorsId: 1 },
  { id: 4, name: 'The Fellowship of the Ring', authorsId: 2 },
  { id: 5, name: 'The Two Towers', authorsId: 2 },
  { id: 6, name: 'The Return of the King', authorsId: 2 },
  { id: 7, name: 'The Way of Shadows', authorsId: 3 },
  { id: 8, name: 'Beyond the Shadows', authorsId: 3 },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorsId : { type: GraphQLNonNull(GraphQLInt) },
    })
})
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of  All Books',
            resolve: () => books
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})


app.use(
  '/graphql',
  expressGraphQL({
    schema: schema,
    graphiql: true,
  }),
);

const port = 5000;
app.listen(port, () => console.log('http:localhost:' + port));
