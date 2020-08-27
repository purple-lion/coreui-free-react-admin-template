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

export default class UserListSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevPropsMemberId: null,
      prevPropsEmail: null,
      prevPropsName: null,

      //
      member_id: null,
      email: null,
      name: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    if (
      nextProps.email !== prevState.prevPropsEmail ||
      nextProps.member_id !== prevState.prevPropsMemberId ||
      nextProps.name !== prevState.prevPropsName
    ) {
      return {
        prevPropsEmail: nextProps.email,
        prevPropsMemberId: nextProps.member_id,
        prevPropsName: nextProps.name,
        //
        email: nextProps.email,
        member_id: nextProps.member_id,
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
            <Label for="exampleEmail">회원</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button onClick={() => {}}>
                  <i className="fa fa-search" />
                </Button>
              </InputGroupAddon>
              <Input
                placeholder="회원번호"
                onChange={e => {
                  console.log(e.target.value)
                  this.setState({
                    member_id: e.target.value,
                  })
                }}
                onKeyPress={e => {
                  if (e.charCode === 13) {
                    const filtered = cleanUpSearchParams(this.state)
                    handleSearchSubmit(filtered)
                  }
                }}
                value={this.state.member_id || ''}
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">이메일</Label>
            <Input
              placeholder="이메일"
              onChange={e => {
                this.setState({
                  email: e.target.value,
                })
              }}
              onKeyPress={e => {
                if (e.charCode === 13) {
                  const filtered = cleanUpSearchParams(this.state)
                  handleSearchSubmit(filtered)
                }
              }}
              value={this.state.email || ''}
            />
          </FormGroup>
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
