import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

export const SatelliteAddPage = () => {
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

  //Get token from cookies
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let token = cookies.token

  const headers = {
    'Content-Type': 'application/json',
    token: token,
  }

  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    //Api connect POST User
    await axios
      .post('/satellites/add', {
        token: token,
        sideNumber: sideNumber,
        producer: producer,
        model: model,
        softwareVersion: softwareVersion,
        yearOfProduction: yearOfProduction,
        dateOfLaunch: dateOfLaunch,
        quantityOfAmmunition: quantityOfAmmunition,
        orbitAltitude: orbitAltitude,
        AI: AI,
      })
      .catch((error) => {
        if (error.response) {
          console.log(error)
          setError(error.response.data)
        }
      })
  }

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
              <h2 className="pt-4">New Satellite</h2>
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
                <Link to="" className="btn btn-danger ml-2">
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
