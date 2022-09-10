import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

export const SatelliteCreateOrEditPage = () => {
  const [sideNumber, setSideNumber] = useState('')
  const [producer, setProducer] = useState('')
  const [model, setModel] = useState('')
  const [softwareVersion, setSoftwareVersion] = useState('')
  const [yearOfProduction, setYearOfProduction] = useState('')
  const [dateOfLaunch, setDateOfLaunch] = useState('')
  const [quantityOfAmmunition, setQuantityOfAmmunition] = useState(0)
  const [orbitAltitude, setOrbitAltitude] = useState(0)
  const [AI, setAI] = useState(false)
  const [error, setError] = useState('')
  const { id } = useParams()
  let navigate = useNavigate()

  //Get token from cookies
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let token = cookies.token
  //satellites header
  const headers = {
    token: token,
  }
  //satellites catch
  const catchFunc = (error: any) => {
    if (error.response.data.errors) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    } else if (error.response) {
      console.log(error.response.data)
      setError(error.response.data)
    }
  }
  let body = {
    sideNumber: sideNumber,
    producer: producer,
    model: model,
    softwareVersion: softwareVersion,
    yearOfProduction: yearOfProduction,
    dateOfLaunch: dateOfLaunch,
    quantityOfAmmunition: quantityOfAmmunition,
    orbitAltitude: orbitAltitude,
    AI: AI,
  }

  useEffect(() => {
    if (id != null) {
      axios(`/satellites/${id}`, { headers }).then((res: any) => {
        setSideNumber(res.data.sideNumber)
        setProducer(res.data.producer)
        setModel(res.data.model)
        setSoftwareVersion(res.data.softwareVersion)
        setYearOfProduction(res.data.yearOfProduction)
        setDateOfLaunch(
          moment(res.data.dateOfLaunch).utc().format('YYYY-MM-DD'),
        )
        setQuantityOfAmmunition(res.data.quantityOfAmmunition)
        setOrbitAltitude(res.data.orbitAltitude)
        setAI(res.data.AI)
      })
    }
  }, [id])

  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    //Add Satellite
    if (id == null) {
      await axios
        .post('/satellites', body, { headers })
        .then(() => {
          navigate('/')
        })
        .catch(catchFunc)
    }
    //Edit Satellite
    else
      await axios
        .put(`/satellites/${id}`, body, { headers })
        .then(() => {
          navigate('/')
        })
        .catch(catchFunc)
  }

  //AI Switch
  const onSwitchAction = () => {
    setAI(!AI)
  }

  return (
    <div className="">
      <Row>
        <Col sm={2} />
        <Col sm={8} className="addCard">
          <div className="Card">
            <Form onSubmit={SubmitHandler} className="FormCard">
              {id == null ? (
                <h2 className="pt-4">Add Satellite</h2>
              ) : (
                <h2 className="pt-4">Edit Satellite</h2>
              )}
              <h5 className="AlertDanger">{error}</h5>
              <Form.Group>
                <label>Side Number</label>
                <Form.Control
                  type="text"
                  placeholder="Enter Side number"
                  value={sideNumber}
                  onChange={(e: any) => setSideNumber(e.target.value)}
                />

                <label>Producer</label>
                <Form.Control
                  type="text"
                  placeholder="Enter Producer"
                  value={producer}
                  onChange={(e: any) => setProducer(e.target.value)}
                />

                <label>Model</label>
                <Form.Control
                  type="text"
                  placeholder="Enter Model"
                  value={model}
                  onChange={(e: any) => setModel(e.target.value)}
                />
              </Form.Group>

              <label>Software Version</label>
              <Form.Control
                type="text"
                placeholder="Enter Software Version"
                value={softwareVersion}
                onChange={(e: any) => setSoftwareVersion(e.target.value)}
              />

              <label>Year of Production</label>
              <Form.Control
                type="number"
                value={yearOfProduction}
                onChange={(e: any) => setYearOfProduction(e.target.value)}
              />

              <label>Date of launch</label>
              <Form.Control
                type="date"
                value={dateOfLaunch}
                onChange={(e: any) => setDateOfLaunch(e.target.value)}
              />

              <label>Quantity of Ammunition</label>
              <Form.Control
                type="number"
                placeholder="Enter number of ammunition"
                value={quantityOfAmmunition}
                onChange={(e: any) => setQuantityOfAmmunition(e.target.value)}
              />

              <label>Orbit Altitude in km</label>
              <Form.Control
                type="number"
                placeholder="Enter url"
                value={orbitAltitude}
                onChange={(e: any) => setOrbitAltitude(e.target.value)}
              />

              <label>AI</label>
              <Form.Label>Does it have an AI?</Form.Label>
              <Form.Check
                type="switch"
                id="nuclear-switch"
                checked={AI}
                onChange={onSwitchAction}
              />
              <div className="pt-3">
                <Button type="submit" variant="success">
                  Submit
                </Button>
                <Link to="/" className="btn btn-danger ml-2">
                  Cancel
                </Link>
              </div>
            </Form>
          </div>
        </Col>

        <Col sm={2} />
      </Row>
    </div>
  )
}
