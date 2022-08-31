import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

export const PenAddPage = () => {
  const [sideNumber, setSideNumber] = useState('')
  const [producer, setProducer] = useState('')
  const [model, setModel] = useState('')
  const [softwareVersion, setSoftwareVersion] = useState('')
  const [yearOfProduction, setYearOfProduction] = useState('')
  const [dateOfLauch, setDateOfLaunch] = useState('')
  const [quantityOfAmmunition, setQuantityOfAmmunition] = useState('')
  const [orbitAltitude, setOrbitAltitude] = useState('')
  const [AI, setAI] = useState(false)
  const [dateOfCreation, setDateOfCreation] = useState('')
  const [dateOfLastUpdate, setDateOfLastUpdate] = useState('')
  const [error, setError] = useState('')

  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    //Api connect POST User
    await axios.post('/satellites/add', {}).catch((error) => {
      if (error.response) {
        console.log(error)
        setError(error.response.data)
      }
    })
  }
  return (
    <div className="">
      <Row>
        <Col sm={2} />
        <Col sm={8} className="addCard">
          <div className="Card">
            <h2>New Satellite</h2>
            <h5 className="AlertDanger">{error}</h5>
            <Form onSubmit={SubmitHandler}>
              <Form.Group>
                <Form.Label>Satellite</Form.Label>
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
                  type="number"
                  placeholder="Enter Price"
                  value={model}
                  onChange={(e: any) => setModel(e.target.value)}
                />
              </Form.Group>
              <label>Software Version</label>
              <Form.Control
                type="text"
                placeholder="Enter url"
                value={softwareVersion}
                onChange={(e: any) => setSoftwareVersion(e.target.value)}
              />
              <label>Year of Production</label>
              <Form.Control
                type="text"
                placeholder="Enter url"
                value={yearOfProduction}
                onChange={(e: any) => setYearOfProduction(e.target.value)}
              />

              <label>Date of launch</label>
              <Form.Control
                type="date"
                placeholder="Enter url"
                value={dateOfLauch}
                onChange={(e: any) => setDateOfLaunch(e.target.value)}
              />
              <label>Quantity of Ammunition</label>
              <Form.Control
                type="number"
                placeholder="Enter url"
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
              <Form.Control type="text" placeholder="Enter url" />
              <label>Date of Creation</label>
              <Form.Control
                type="date"
                placeholder="Enter url"
                value={dateOfCreation}
                onChange={(e: any) => setDateOfCreation(e.target.value)}
              />
              <label>Date of Last Update</label>
              <Form.Control
                type="date"
                placeholder="Enter url"
                value={dateOfLastUpdate}
                onChange={(e: any) => setDateOfLastUpdate(e.target.value)}
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
