import { useEffect, useState } from 'react'
import { Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SatellitesHeaderComponent } from './satellitesHeaderComponent'
import Satellites from '../../components/satellitesPagination'
//import '../../stylesheets/pensPaginationCRUD.css'

import axios from 'axios'
import { useCookies } from 'react-cookie'

export const SatellitesListPage = () => {
  //Get token from cookies
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let token = cookies.token

  const headers = {
    'Content-Type': 'application/json',
    token: token,
  }
  const [backendData, setBackendData] = useState<any>([])
  //Get satellites
  useEffect(() => {
    axios('/satellites', { headers }).then((res) => {
      setBackendData(res.data.satellites)
    })
  }, [])

  return (
    <div className="">
      <Row>
        <Col sm={2} />
        <Col sm={8} className="MainRow">
          <div className="MenuCrudMain ">
            <SatellitesHeaderComponent />
            <div>
              <Satellites data={backendData} />
            </div>
          </div>
        </Col>

        <Col sm={2} />
      </Row>
    </div>
  )
}
