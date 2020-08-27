import React, {Component} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {PaginationProvider,} from 'react-bootstrap-table2-paginator'
import PaginationListAndSizePerPageDropdown from './common/PaginationListAndSizePerPageDropdown'
import axios from 'axios'
import _ from 'underscore'
import {
  couponCodeFormatterFactory, couponGroupFormatterFactory,
  dateTimeFormatterFactory,
  primaryIdFormatterFactory,
  userIdFormatterFactory,
} from '../common/formatter/formatter'
import CouponListSearchForm from './common/CouponListSearchForm'
import config from '../config'
import {Link} from "react-router-dom";

let cancel

export default class CouponListTable extends Component {
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
      },
      columns: [
        {
          dataField: 'id',
          text: '번호',
          headerStyle: {width: '8em', textAlign: 'center'},
          classes: 'text-center',
          // formatter: primaryIdFormatterFactory(row => row.id),
        },
        {
          dataField: 'code',
          text: '쿠폰 코드',
          formatter: couponCodeFormatterFactory(
            row => [row.id, row.code]
          ),
          // formatter: (cell, row, rowIndex, formatExtraData) => {
          //   return (
          //     <code>
          //       {row.code}
          //     </code>
          //   )
          // },
          headerStyle: {textAlign: 'center'},
          classes: 'text-center text-truncate',
        },
        {
          dataField: 'coupon_group.name',
          text: '쿠폰 그룹',
          headerStyle: {textAlign: 'center'},
          classes: 'text-center text-truncate',
          formatter: couponGroupFormatterFactory(
            row => {
              try {
                return [row.coupon_group.id, row.coupon_group.name]
              } catch (e) {
                return [null, null]
              }
            }
          )
        },
        {
          dataField: 'coupon_group.start_at',
          text: '시작일시',
          formatter: dateTimeFormatterFactory(row => row.coupon_group ? row.coupon_group.start_at : null),
          classes: 'text-center',
          headerStyle: {width: '14em', textAlign: 'center'},
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

  loadItemList = async (page, sizePerPage, search) => {
    try {
      const res = await axios.get(`${config.API_BASE}/admin/coupons/coupons`, {
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
        // pagination: parsePaginationHeaders(res.headers),
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
          <CouponListSearchForm
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
