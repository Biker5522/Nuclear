import { useEffect, useState } from 'react'
import { Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SatellitesHeaderComponent } from './satellitesHeaderComponent'
import Satellites from '../../components/satellitesPagination'
//import '../../stylesheets/pensPaginationCRUD.css'

import axios from 'axios'

export const SatellitesListPage = () => {
  const [backendData, setBackendData] = useState<any>([])
  //Get pens from Menu
  useEffect(() => {
    axios('/satellites').then((res) => {
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
