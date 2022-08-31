import { useState, SyntheticEvent } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import '../stylesheets/login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { countryList } from '../components/countriesList'

export const RegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nation, setNation] = useState('')
  const [nuclearButton, setNuclearButton] = useState(false)

  const onSwitchAction = () => {
    setNuclearButton(!nuclearButton)
  }

  let [errorMsg, setError] = useState('')
  const [cookies, setCookie] = useCookies(['token'])
  let navigate = useNavigate()

  //Post User
  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    //Api connect POST User
    await axios
      .post(
        'users/register',
        {
          fullName,
          email,
          password,
          nation,
          nuclearButton,
        },
        { withCredentials: true },
      )
      //Set Cookie
      .then((res) => {
        setCookie('token', res.data)
        navigate('/')
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data)
        }
      })
  }
  return (
    <div>
      <Row className="m-0 p-0">
        <Col sm={2} />
        <Col sm={8}>
          <div className="d-flex justify-content-center align-items-center">
            {/*Login Card */}
            <div className="FormCard">
              <h2>Register</h2>
              <h5 className="AlertDanger">{errorMsg}</h5>
              <Form onSubmit={SubmitHandler}>
                {/* Fullname */}
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e: any) => setFullName(e.target.value)}
                  />

                  {/* Nation Form */}
                  <Form.Label>Nation</Form.Label>
                  <Form.Select
                    onChange={(e: any) => setNation(e.target.value)}
                    value={nation}
                  >
                    <option>Open this to choose</option>
                    {countryList.map((country) => (
                      <option value={country}>{country}</option>
                    ))}
                    );
                  </Form.Select>

                  {/* Email Form */}
                  <Form.Label>Email Adress</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                  {/* Password Form */}
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <Form>
                    <Form.Label>Do you have a nuclear button?</Form.Label>
                    <Form.Check
                      type="switch"
                      id="nuclear-switch"
                      checked={nuclearButton}
                      onChange={onSwitchAction}
                    />
                  </Form>
                </Form.Group>
                <Link to="/login">You have an account? </Link>
                <div className="ButtonsContainer">
                  {/* Button */}
                  <Button
                    className="Button"
                    variant="primary"
                    type="submit"
                    style={{ margin: '0.5rem auto ' }}
                  >
                    Register
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
        <Col sm={2} />
      </Row>
    </div>
  )
}
