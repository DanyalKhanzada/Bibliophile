const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input BookInput {
    bookId: String
    title: String
    authors: [String]
    description: String
    link: String
    image: String
  }  

  type Book {
    bookId: String
    title: String
    authors: [String]
    description: String
    link: String
    image: String
  } 

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;