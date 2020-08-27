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

export default class CouponGroupListSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevPropsName: null,

      //
      name: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    if (
      nextProps.name !== prevState.prevPropsName
    ) {
      return {
        prevPropsName: nextProps.name,
        //
        name: nextProps.name,
      }
    }

    return null
  }

  handleReset = () => {
    this.setState({ member_id: null, email: null, name: null })
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
            <Label for="examplePassword">이름</Label>
            <Input
              placeholder="이름"
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
