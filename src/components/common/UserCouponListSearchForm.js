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

export default class UserCouponListSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevPropsName: null,
      prevPropsCouponGroupId: null,

      //
      name: null,
      coupon_group_id: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    if (
      nextProps.name !== prevState.prevPropsName ||
      nextProps.coupon_group_id !== prevState.prevPropsCouponGroupId
    ) {
      return {
        prevPropsName: nextProps.name,
        prevPropsCouponGroupId: nextProps.coupon_group_id,
        //
        name: nextProps.name,
        coupon_group_id: nextProps.coupon_group_id,
      }
    }

    return null
  }

  handleReset = () => {
    this.setState({ name: null, coupon_group_id: null })
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
                  name: e.target.value,
                })
              }}
              onKeyPress={e => {
                if (e.charCode === 13) {
                  const filtered = cleanUpSearchParams(this.state)
                  handleSearchSubmit(filtered)
                }
              }}
              value={this.state.name || ''}
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
          <FormGroup>
            <Label for="examplePassword">사용자 ID</Label>
            <Input
              placeholder="사용자 ID"
              onChange={e => {
                this.setState({
                  user_id: e.target.value,
                })
              }}
              onKeyPress={e => {
                if (e.charCode === 13) {
                  const filtered = cleanUpSearchParams(this.state)
                  handleSearchSubmit(filtered)
                }
              }}
              value={this.state.user_id || ''}
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
