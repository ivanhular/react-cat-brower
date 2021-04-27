import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Form, Card, Spinner, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/Provider'
import {
  catBreedList,
  catBreedImages,
  loadMoreImages,
} from '../context/actions/cats'

const HomeScreen = ({ location }) => {
  const params = location.search.split('=')[1]
  const {
    cats: { breeds, imageList, loading, error, page, totalCount },
    dispatch,
  } = useContext(GlobalContext)

  const [breed, setBreed] = useState()
  const [selectedBreed, setSelectedBreed] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  const selectBreed = (e) => {
    setSelectedBreed(e.target.value)
    setCurrentPage(1)
    catBreedImages(e.target.value)(dispatch, page)
  }

  const loadMore = () => {
    if (selectedBreed) {
      loadMoreImages()(dispatch, {
        id: selectedBreed,
        imageList,
        page: currentPage + 1,
      })
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (params) {
      setBreed(params)
      catBreedImages(params)(dispatch)
    }
    catBreedList()(dispatch)
  }, [dispatch, params])
  return (
    <div className='home'>
      <h1>Cat Browser</h1>
      <Row>
        <Col md={3} sm={6} xs={12}>
          <Form.Group controlId='exampleForm.ControlSelect1'>
            <Form.Label>Select Breed</Form.Label>
            <Form.Control as='select' value={breed} onChange={selectBreed}>
              <option>Select Breed</option>
              {breeds?.length > 0 &&
                breeds.map((breed) => (
                  <option value={breed.id}>{breed.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {error ? (
          <Col xs={12}>
            <Alert variant='danger'>{error}</Alert>
          </Col>
        ) : loading ? (
          <Col xs={12}>
            <Spinner animation='border' variant='primary' size='lg' />
          </Col>
        ) : imageList.length > 0 ? (
          imageList.map((image) => (
            <Col md={3} sm={6} xs={12} key={image.id}>
              <Card>
                <div
                  style={{
                    maxHeight: '200px',
                    minHeight: '200px',
                    overflow: 'hidden',
                  }}
                >
                  <Card.Img variant='top' src={image.url} />
                </div>
                <Card.Body>
                  <Button variant='primary' block as={Link} to={image.id}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12} style={{ marginBottom: '20px' }}>
            No cats available
          </Col>
        )}
      </Row>
      <Row>
        <Col md={3} sm={6} xs={12}>
          {imageList.length < 10 || imageList.length === totalCount ? (
            ''
          ) : (
            <Button variant='success' onClick={loadMore}>
              {' '}
              Load more
            </Button>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default HomeScreen
