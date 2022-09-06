import { useState, SyntheticEvent } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import '../stylesheets/login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let [errorMsg, setError] = useState('')
  const [cookies, setCookie] = useCookies(['token'])
  let navigate = useNavigate()

  //Post User
  const SubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    //Api connect POST User
    await axios
      .post(
        '/login',
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      //Set Cookie
      .then((res) => {
        setCookie('token', res.data)
        navigate('/')
      })
      .catch((error) => {
        if (error.response.data.errors) {
          console.log(error.response.data.errors[0].msg)
          setError(error.response.data.errors[0].msg)
        } else if (error.response) {
          console.log(error.response.data)
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
              <h2>Login</h2>
              <h5 className="AlertDanger">{errorMsg}</h5>
              <Form onSubmit={SubmitHandler}>
                {/* Email Form */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Adress</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </Form.Group>
                {/* Password Form */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Link to="/Register">You don't have an account? </Link>
                <div className="ButtonsContainer">
                  {/* Button */}
                  <Button
                    className="Button"
                    variant="primary"
                    type="submit"
                    style={{ margin: '0.5rem auto ' }}
                  >
                    Log in
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
