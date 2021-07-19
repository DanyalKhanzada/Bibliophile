import React from 'react';
import { Jumbotron, Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // loader??
  const { loading, data }  = useQuery(QUERY_ME);
  const userData = data?.me;

  const [removeBook] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { "bookId":  bookId } });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return (
    <div className='d-flex justify-content-center mt-5'>

      <Spinner animation='grow' role='status' variant='info'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
      </div>
    );
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container className='d-flex align-items-end'>
          <h1> Your bookshelf</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.bookCount
            ? `Viewing ${userData.bookCount} saved ${userData.bookCount === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col sm={6} md={4} lg={3} key={book.bookId}>

                <Card border='dark' className='mb-2'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                    <Card.Title><a href={book.link} target='_blank' className='text-dark'>{book.title} <FaExternalLinkAlt /></a></Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text style={{ maxHeight: "200px", overflow: "auto" }}>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
              
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
