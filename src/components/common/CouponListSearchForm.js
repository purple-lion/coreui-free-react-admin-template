import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
} from 'reactstrap'
import React from 'react'
import { cleanUpSearchParams } from '../../lib/utils'

export default class CouponListSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevPropsCouponCode: null,
      prevPropsCouponGroupId: null,

      //
      coupon_code: null,
      coupon_group_id: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    if (
      nextProps.coupon_code !== prevState.prevPropsCouponCode ||
      nextProps.coupon_group_id !== prevState.prevPropsCouponGroupId
    ) {
      return {
        prevPropsCouponCode: nextProps.coupon_code,
        prevPropsCouponGroupId: nextProps.coupon_group_id,
        //
        coupon_code: nextProps.coupon_code,
        coupon_group_id: nextProps.coupon_group_id,
      }
    }

    return null
  }

  handleReset = () => {
    this.setState({ coupon_code: null, coupon_group_id: null })
    if (typeof this.props.handleReset === 'function') {
      this.props.handleReset()
    } else if (typeof this.props.handleSearchSubmit === 'function') {
      this.props.handleSearchSubmit({})
    }
  }

  render() {
    const { handleSearchSubmit } = this.props
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="examplePassword">쿠폰 코드</Label>
            <Input
              placeholder="쿠폰 코드"
              onChange={e => {
                this.setState({
                  coupon_code: e.target.value,
                })
              }}
              onKeyPress={e => {
                if (e.charCode === 13) {
                  const filtered = cleanUpSearchParams(this.state)
                  handleSearchSubmit(filtered)
                }
              }}
              value={this.state.coupon_code || ''}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">쿠폰 그룹 ID</Label>
            <Input
              placeholder="쿠폰 그룹 ID"
              onChange={e => {
                this.setState({
                  coupon_group_id: e.target.value,
                })
              }}
              onKeyPress={e => {
                if (e.charCode === 13) {
                  const filtered = cleanUpSearchParams(this.state)
                  handleSearchSubmit(filtered)
                }
              }}
              value={this.state.coupon_group_id || ''}
            />
          </FormGroup>

          <div className="text-right">
            <Button
              onClick={() => {
                const filtered = cleanUpSearchParams(this.state)
                handleSearchSubmit(filtered)
              }}
              style={{ marginRight: '8px' }}
            >
              찾아보기
            </Button>
            <Button onClick={this.handleReset}>검색 초기화</Button>
          </div>
        </Form>
      </div>
    )
  }
}
