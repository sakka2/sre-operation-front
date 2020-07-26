import React, { useEffect, useState } from 'react'
import OperationSummary from './OperationSummary'
import { getUsers } from '../lib/api'

const OperationList = ({ operations }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    ;(async () => {
      const users = await getUsers('')
      setUsers(users)
    })()
  }, [])

  return (
    <>
      <div className="metrics-wrap">
        {operations.length !== 0 &&
          users.length !== 0 &&
          users.reduce((prev, user) => {
            const userOperation = operations.filter(
              (operation) => operation.user_id === user.user_id,
            )
            if (userOperation.length) {
              prev.push(
                <OperationSummary key={user.user_id} operations={userOperation} user={user} />,
              )
            }
            return prev
          }, [])}
        {operations && !operations.length && <p> No data found </p>}
      </div>
    </>
  )
}

export default OperationList
