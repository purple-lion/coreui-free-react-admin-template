import React, {Component} from 'react'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap'
import queryString from 'query-string'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import UserCouponListTable from '../../components/UserCouponListTable'


class UserCouponList extends Component {
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
      `/coupons/coupons/list?page=${page}&per_page=${sizePerPage}`
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
                <i className="fa fa-align-justify"/> 사용자에게 등록된 쿠폰 목록
              </CardHeader>
              <CardBody>
                <UserCouponListTable/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default UserCouponList

