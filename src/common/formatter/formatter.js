import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {Badge} from 'reactstrap'

export const userIdFormatter = (cell, row, rowIndex, formatExtraData) => {
  const {member_id} = row
  return (
    <div>
      <i className="fa fa-user"/> {member_id}
    </div>
  )
}

export const booleanFormatterFactory = booleanFieldExtractor => {
  return (cell, row, rowIndex, formatExtraData) => {
    const value = booleanFieldExtractor(row)
    return (
      <div>
        {value ? (
          <i className="fa fa-check-circle text-success"/>
        ) : (
          <i className="fa fa-circle text-danger"/>
        )}
      </div>
    )
  }
}

export const dateTimeFormatterFactory = (
  dateTimeExtractor,
  format = 'YYYY-MM-DD HH:mm:ss'
) => {
  return (cell, row, rowIndex, formatExtraData) => {
    const dateTimeStr = dateTimeExtractor(row)
    return <div>{moment(dateTimeStr).format(format)}</div>
  }
}

const MembershipInline = ({membership}) => {
  return (
    <div>
      <Badge>{membership.type_text}</Badge>
    </div>
  )
}

const MemberInline = ({member}) => {
  return (
    <div>
      <div>
        <i className="fa fa-user text-primary" style={{marginRight: '4px'}}/>
        <Link to={`/users/users-detail/${member.id}`}>{member.id}</Link>
      </div>
      <div>{member.name}</div>
      <div>{member.email}</div>
    </div>
  )
}

export const primaryIdFormatterFactory = primaryIdExtractor => {
  return (cell, row, rowIndex, formatExtraData) => {
    const primaryId = primaryIdExtractor(row)
    return (
      <div>
        <i
          className="fa fa-hashtag text-primary"
          style={{marginRight: '4px'}}
        />
        <Link to={`/users/users-detail/${primaryId}`}>{primaryId}</Link>
      </div>
    )
  }
}

export const couponCodeFormatterFactory = idExtractor => {
  return (cell, row, rowIndex, formatExtraData) => {
    const [couponId, couponCode] = idExtractor(row)
    return (
      <div>
        <i
          className="fa fa-tag text-primary"
          style={{marginRight: '4px'}}
        />
        <Link to={`/coupons/coupon-detail/${couponId}`}><code>{couponCode}</code></Link>
      </div>
    )
  }
}

export const couponGroupFormatterFactory = idExtractor => {
  return (cell, row, rowIndex, formatExtraData) => {
    const [couponGroupId, couponGroupName] = idExtractor(row)
    return (
      <div>
        <i
          className="fa fa-briefcase text-primary"
          style={{marginRight: '4px'}}
        />
        <Link to={`/coupons/coupon-groups/${couponGroupId}`}>[{couponGroupId}] {couponGroupName}</Link>
      </div>
    )
  }
}


export const userIdFormatterFactory = userIdExtractor => {
  return (cell, row, rowIndex, formatExtraData) => {
    const userId = userIdExtractor(row)
    if (row.member) {
      return (
        <div>
          {row.member ? (
            <MemberInline member={row.member}/>
          ) : (
            <div>
              <i
                className="fa fa-user text-primary"
                style={{marginRight: '4px'}}
              />
              <Link to={`/users/users-detail/${userId}`}>{userId}</Link>
            </div>
          )}
          {row.membership ? (
            <MembershipInline membership={row.membership}/>
          ) : (
            undefined
          )}
        </div>
      )
    } else {
      return (
        <div>
          <i
            className="fa fa-user text-primary"
            style={{marginRight: '4px'}}
          />
          <Link to={`/users/users-detail/${userId}`}>{userId}</Link>
        </div>
      )
    }
  }
}
