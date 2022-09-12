import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import '../stylesheets/satellitesPagination.css'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function PaginatedSatellites(props: any) {
  let navigate = useNavigate()
  const { data } = props
  const [currentItems, setCurrentItems] = useState<any>([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 9

  //Get token from cookies
  const [cookies] = useCookies(['token'])
  let token: any = jwt_decode(cookies.token)
  let tokenNation = token.nation

  const headers = {
    token: token,
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(data.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(data.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, data])

  //Confirmation
  const confirmationDelete = (_id: any) => {
    confirmAlert({
      title: 'Confirm to delete satellite',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeSatellite(_id),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    })
  }

  //Delete Product
  const removeSatellite = (_id: any) => {
    let id: String = _id
    axios
      .delete(`/satellites/${_id}`, { headers: { token: token } })
      .catch(function (error) {
        console.log(error)
      })
      .then(() => {
        window.location.reload()
      })
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    )
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className="satellitesCRUD">
        {currentItems
          .filter((satellite: any) => satellite.nation == tokenNation)
          .map((satellite: any) => {
            return (
              <div>
                <ListGroup>
                  <ListGroupItem>
                    <div className="d-grid">
                      <p>
                        <div className="description">
                          <strong>{satellite.sideNumber}&nbsp;</strong>{' '}
                          {satellite.model}&nbsp;{satellite.producer}$
                        </div>
                      </p>

                      <div className="listButtons">
                        <Link
                          className="btn btn-warning  mr-1 "
                          to={`../satellites/edit/${satellite._id}`}
                        >
                          Edit
                        </Link>
                        <Button
                          className="btn btn-warning  mr-1 "
                          onClick={() => confirmationDelete(satellite._id)}
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </div>
            )
          })}
      </div>
      <ReactPaginate
        breakLabel=".."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        //renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  )
}
