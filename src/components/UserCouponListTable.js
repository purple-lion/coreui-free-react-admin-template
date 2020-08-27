import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {PaginationProvider,} from 'react-bootstrap-table2-paginator'
import PaginationListAndSizePerPageDropdown from './common/PaginationListAndSizePerPageDropdown'
import axios from 'axios'
import _ from 'underscore'
import {
  booleanFormatterFactory,
  couponCodeFormatterFactory,
  couponGroupFormatterFactory,
  dateTimeFormatterFactory,
  userIdFormatterFactory,
} from '../common/formatter/formatter'
import UserCouponListSearchForm from './common/UserCouponListSearchForm'
import config from '../config'
import {Button} from "reactstrap";

let cancel

export default class UserCouponListTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prevPropsPage: null,
      prevPropsSizePerPage: null,
      prevPropsSearch: null,

      //
      dataOrError: null,
      page: null,
      sizePerPage: 20,
      pagination: {},
      search: {},
      expandRow: {
        renderer: row => (
          <div>
            <pre>{JSON.stringify(row, null, 2)}</pre>
          </div>
        ),
        showExpandColumn: true,
        expandByColumnOnly: true,
        expandHeaderColumnRenderer: ({isAnyExpands}) => {
          if (isAnyExpands) {
            return <i className={"fa fa-minus-square"}/>
          }
          return <i className={"fa fa-plus-square"}/>;
        },
        expandColumnRenderer: ({expanded}) => {
          if (expanded) {
            return <i className={"fa fa-minus-square"}/>
          }
          return <i className={"fa fa-plus-square"}/>
        }

      },
      columns: [
        {
          dataField: 'id',
          text: '번호',
          headerStyle: {width: '8em', textAlign: 'center'},
          classes: 'text-center',
        },
        {
          dataField: 'code',
          text: '쿠폰 코드',
          formatter: couponCodeFormatterFactory(row => {
            try {
              return [row.coupon.id, row.coupon.code]
            } catch (e) {
              return [null, null]
            }
          }),
          headerStyle: {textAlign: 'center'},
          classes: 'text-center text-truncate',
        },
        {
          dataField: 'name',
          text: '쿠폰 그룹',
          headerStyle: {textAlign: 'center'},
          formatter: couponGroupFormatterFactory(row => {
            try {
              return [row.coupon.coupon_group.id, row.coupon.coupon_group.name]
            } catch (e) {
              return [null, null]
            }
          }),
          classes: 'text-center text-truncate',
        },
        {
          dataField: 'registered_by_user_id',
          text: '사용자 ID',
          headerStyle: {textAlign: 'center'},
          formatter: userIdFormatterFactory(row => row.registered_by_user_id),
          classes: 'text-center text-truncate',
        },
        {
          dataField: 'is_used',
          text: '사용 여부',
          formatter: booleanFormatterFactory(row => row.is_used),
          classes: 'text-center',
          headerStyle: {width: '8em', textAlign: 'center'},
        },
        {
          dataField: 'coupon_group.expire_at',
          text: '만료일시',
          formatter: dateTimeFormatterFactory(row => row.coupon_group ? row.coupon_group.expire_at : null),
          classes: 'text-center',
          headerStyle: {width: '14em', textAlign: 'center'},
        },
        {
          dataField: 'created_at',
          text: '생성일시',
          formatter: dateTimeFormatterFactory(row => row.created_at),
          classes: 'text-center',
          headerStyle: {width: '14em', textAlign: 'center'},
        },
        {
          dataField: 'none',
          text: 'click me',
          formatter: (cell, row, rowIndex, formatExtraData) => {
            const handleClick = () => {
              alert(`${row.id} 항목을 등록 취소 합니다.`)
              const endpoint = `${config.API_BASE}/admin/coupons/user-coupons/${row.id}`
              axios.delete(endpoint).then(
                res => {
                  alert(JSON.stringify(res.data))
                  this.reloadItemList()
                }
              ).catch(error => {
                alert(error)
              })
            }

            return (<div>
              <Button color="danger" outline size="sm" onClick={handleClick}>등록 취소</Button>
            </div>)
          },
          classes: 'text-center',
          headerStyle: {width: '8em', textAlign: 'center'},
        },
      ],
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.page !== prevState.prevPropsPage ||
      nextProps.sizePerPage !== prevState.prevPropsSizePerPage ||
      !_.isEqual(nextProps.search, prevState.prevPropsSearch)
    ) {
      if (typeof cancel === 'function') {
        cancel()
      }

      return {
        prevPropsPage: nextProps.page,
        prevPropsSizePerPage: nextProps.sizePerPage,
        prevPropsSearch: nextProps.search,
        //
        page: nextProps.page ? nextProps.page : 1,
        sizePerPage: nextProps.sizePerPage ? nextProps.sizePerPage : 20,
        search: {...nextProps.search},
        dataOrError: null,
      }
    }

    return null
  }

  componentDidMount() {
    try {
      const {page, sizePerPage, search} = this.state
      this.loadItemList(page, sizePerPage, search)
    } catch (e) {
      console.log(e)
    }
  }

  reloadItemList = () => {
    const {page, sizePerPage, search} = this.state
    this.loadItemList(page, sizePerPage, search)
  }

  loadItemList = async (page, sizePerPage, search) => {
    try {
      const res = await axios.get(`${config.API_BASE}/admin/coupons/user-coupons`, {
        params: {
          page: page,
          per_page: sizePerPage,
          ...search,
        },
      })

      if (!res) {
        return;
      }

      this.setState({
        dataOrError: res.data.data,
        pagination: res.data.pagination,
      });
    } catch (e) {
      console.log(e)

      this.setState({
        dataOrError: [],
        pagination: {},
      })
    }
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.dataOrError === null) {
      const {page, sizePerPage, search} = this.state
      await this.loadItemList(page, sizePerPage, search)
    }
  }

  handleTableChange = async (type, {page, sizePerPage}) => {
    this.setState(() => ({
      dataOrError: null,
      page,
      sizePerPage,
    }))
  }

  handleSearchSubmit = params => {
    console.log('handleSearchSubmit', params)
    this.setState({
      search: {
        ...params,
      },
      dataOrError: null,
      page: 1,
    })
  }

  render() {
    const {
      dataOrError,
      sizePerPage,
      page,
      pagination: {total_count: totalSize},
      search,
      columns,
      expandRow,
    } = this.state

    console.log(this.state)

    const options = {
      page,
      sizePerPage,
      custom: true,
      totalSize,
    }
    console.log(options)

    return (
      <div>
        <div>
          <UserCouponListSearchForm
            handleSearchSubmit={this.handleSearchSubmit}
            {...search}
          />
          <hr/>
        </div>

        <PaginationProvider pagination={paginationFactory(options)}>
          {({paginationProps, paginationTableProps}) => (
            <div>
              {!this.props.hideTopPaginationArea && (
                <PaginationListAndSizePerPageDropdown
                  paginationProps={paginationProps}
                />
              )}

              <BootstrapTable
                remote
                keyField="id"
                data={dataOrError || []}
                columns={columns}
                onTableChange={this.handleTableChange}
                expandRow={expandRow}
                {...paginationTableProps}
              />

              {!this.props.hideBottomPaginationArea && (
                <PaginationListAndSizePerPageDropdown
                  paginationProps={paginationProps}
                />
              )}
            </div>
          )}
        </PaginationProvider>
      </div>
    )
  }
}
