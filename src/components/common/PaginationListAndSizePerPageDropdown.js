import { Col, Row } from 'reactstrap'
import {
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator'
import * as PropTypes from 'prop-types'
import React from 'react'

export default function PaginationListAndSizePerPageDropdown(props) {
  return (
    <Row className="react-bootstrap-table-pagination">
      <Col md="6" xs="6" sm="6" lg="6">
        <SizePerPageDropdownStandalone {...props.paginationProps} />
      </Col>

      <Col
        md="6"
        xs="6"
        sm="6"
        lg="6"
        className="react-bootstrap-table-pagination-list"
      >
        <PaginationListStandalone {...props.paginationProps} />
      </Col>
    </Row>
  )
}

PaginationListAndSizePerPageDropdown.propTypes = {
  paginationProps: PropTypes.any,
}
