import React, { useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { GlobalContext } from '../context/Provider'
import { catBreedDetail } from '../context/actions/cats'

const BreedScreen = ({ match, history }) => {
  const {
    cats: { detail },
    dispatch,
  } = useContext(GlobalContext)

  const goBack = () => {
    history.push(`/?breed=${detail.breeds[0]?.id}`)
  }

  useEffect(() => {
    if (!detail.id || match?.params.id !== detail?.id) {
      catBreedDetail(match.params.id)(dispatch)
    }
    // catBreedDetail(match.params.id)(dispatch)
  }, [match, detail, dispatch])

  return (
    <div class='breed__page'>
      {console.log(detail)}
      <Card>
        <Card.Header>
          <Button onClick={goBack} variant='primary'>
            Back
          </Button>
        </Card.Header>
        <Card.Img variant='top' src={detail.url} />
        <Card.Body>
          <h4>{detail?.breeds[0]?.name}</h4>
          <h5>Origin: {detail?.breeds[0]?.origin}</h5>
          <h6>{detail?.breeds[0]?.temperament}</h6>
          <Card.Text>{detail?.breeds[0]?.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BreedScreen
