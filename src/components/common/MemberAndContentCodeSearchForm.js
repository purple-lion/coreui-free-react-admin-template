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

export default class MemberAndContentCodeSearchForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevPropsMemberId: null,
      prevPropsContentCode: null,

      //
      member_id: null,
      content_code: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState)
    if (
      nextProps.member_id !== prevState.prevPropsMemberId ||
      nextProps.content_code !== prevState.prevPropsContentCode
    ) {
      return {
        prevPropsContentCode: nextProps.content_code,
        prevPropsMemberId: nextProps.member_id,
        content_code: nextProps.content_code,
        member_id: nextProps.member_id,
      }
    }

    return null
  }

  handleReset = () => {
    this.setState({ member_id: null, content_code: null })
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
            <Label for="examplePassword">콘텐츠 코드</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button onClick={() => {}}>
                  <i className="fa fa-search" />
                </Button>
              </InputGroupAddon>
              <Input
                placeholder="콘텐츠 코드"
                onChange={e => {
                  this.setState({
                    content_code: e.target.value,
                  })
                }}
                onKeyPress={e => {
                  if (e.charCode === 13) {
                    const filtered = cleanUpSearchParams(this.state)
                    handleSearchSubmit(filtered)
                  }
                }}
                value={this.state.content_code || ''}
              />
            </InputGroup>
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
