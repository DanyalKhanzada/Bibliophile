import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
  }
}`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!, $email: String!) {
  addUser(username: $username, password: $password, email: $email) {
    token 
    user {
      _id
      username
  	  email
    }
  }
}`;

export const SAVE_BOOK = gql`
mutation ($book: BookInput!) {
  saveBook(book: $book) {
    _id
    username
    email
    bookCount
    savedBooks {
        bookId
        title
        authors
        description
        image
        link
    }
  }
}`;

export const REMOVE_BOOK = gql`
mutation ($bookId: ID!) {
  removeBook (bookId: $bookId) {
    _id
    username
    bookCount
    savedBooks {
      bookId
        title
        authors
        description
        image
        link
    }
  }
}`;