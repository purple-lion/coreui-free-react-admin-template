import React, {Component} from 'react'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap'
import queryString from 'query-string'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import CouponGroupListTable from '../../components/CouponGroupListTable'


class CouponGroupList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      sizePerPage: 20,
      pagination: {
        count: 100,
      },
    }
  }

  componentDidMount = async () => {
    const {page: _page, per_page: _sizePerPage} = queryString.parse(
      this.props.location.search
    )

    let page = 1,
      sizePerPage = this.state.sizePerPage

    try {
      if (_page) {
        page = parseInt(_page)
      }
    } catch (e) {
    }

    try {
      if (_sizePerPage) {
        sizePerPage = parseInt(_sizePerPage)
      }
    } catch (e) {
    }

    this.setState({page, sizePerPage,})
  }

  handleTableChange = async (type, {page, sizePerPage}) => {
    this.props.history.push(
      `/coupons/coupon-groups/-list?page=${page}&per_page=${sizePerPage}`
    )

    this.setState(() => ({page, sizePerPage,}))
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"/> 쿠폰 그룹 목록
              </CardHeader>
              <CardBody>
                <CouponGroupListTable/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CouponGroupList
