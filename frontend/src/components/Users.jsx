import React, { useEffect, useState } from 'react'
import User from './User'
import { getSprints, getUsers, getOperations } from '../lib/api'

const App = () => {
  const [targetSprint, setSprint] = useState('')
  const [targetMonth, setMonth] = useState('')
  const [sprints, setSprints] = useState({})
  const [users, setUsers] = useState([])
  const [operations, setOperations] = useState([])

  useEffect(() => {
    ;(async () => {
      const sprints = await getSprints(targetSprint)
      setSprints(sprints)

      const operations = await getOperations({
        ...(targetSprint ? { sprint: targetSprint } : {}),
        ...(targetMonth ? { month: targetMonth } : {}),
      })
      setOperations(operations)
    })()
  }, [targetSprint, targetMonth])

  useEffect(() => {
    ;(async () => {
      const users = await getUsers('')
      setUsers(users)
    })()
  }, [])

  const isWeekly = () => !targetMonth

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const setTarget = (direction) =>
    isWeekly() ? setWeeklyTarget(direction) : setMonthlyTarget(direction)

  const setWeeklyTarget = (direction) => {
    const d = !targetSprint ? new Date() : new Date(targetSprint)

    if (direction === 'prev') {
      d.setDate(d.getDate() - 7)
    }
    if (direction === 'next') {
      d.setDate(d.getDate() + 7)
    }
    setSprint(formatDate(d))
  }

  const setMonthlyTarget = (direction) => {
    const d = new Date(targetMonth)

    if (direction === 'prev') {
      d.setMonth(d.getMonth() - 1)
    }
    if (direction === 'next') {
      d.setMonth(d.getMonth() + 1)
    }
    setMonth(formatDate(d).split('-', 2).join('-'))
  }

  const toggleTarget = () => {
    const d = new Date()
    if (!isWeekly()) {
      setMonth('')
      setSprint(formatDate(d))
    } else {
      setMonth(formatDate(d).split('-', 2).join('-'))
      setSprint('')
    }
  }

  return (
    <>
      <section className="sre-metrics">
        <div>
          <h1 onClick={() => window.location.reload()}>運用時間集計</h1>
          <a href="#" onClick={() => toggleTarget()}>
            {isWeekly() ? '月次を表示' : '週次を表示'}
          </a>
        </div>
        <p>
          <a href="#" onClick={() => setTarget('prev')}>
            &lt;&lt; Prev
          </a>
          {sprints &&
            (isWeekly()
              ? `${sprints.startDate} (水) - ${sprints.endDate} (火)`
              : `${targetMonth}月`)}
          <a href="#" onClick={() => setTarget('next')}>
            Next &gt;&gt;
          </a>
        </p>
        <div className="metrics-wrap">
          {operations &&
            users &&
            users.reduce((prev, user) => {
              const userOperation = operations.filter(
                (operation) => operation.user_id === user.user_id,
              )
              if (userOperation.length) {
                prev.push(<User key={user.user_id} operations={userOperation} user={user} />)
              }
              return prev
            }, [])}
          {operations && !operations.length && <p> No data found </p>}
        </div>
      </section>
    </>
  )
}

export default App
