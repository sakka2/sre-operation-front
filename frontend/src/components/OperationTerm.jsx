import React, { useEffect, useState } from 'react'
import OperationList from './OperationList'
import { getSprints, getOperations } from '@src/lib/api'
import logo from '../assets/images/logo.png'

const OperationTerm = () => {
  const [targetSprint, setSprint] = useState('today')
  const [targetMonth, setMonth] = useState('')
  const [sprints, setSprints] = useState({})
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

  const isWeekly = () => !targetMonth

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const setTarget = (direction) => (isWeekly() ? setWeeklyTarget(direction) : setMonthlyTarget(direction))

  const setWeeklyTarget = (direction) => {
    const d = targetSprint === 'today' ? new Date() : new Date(targetSprint)

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
          <img src={logo} alt="logo" />
          <h1 onClick={() => window.location.reload()}>運用時間集計</h1>
          <a href="#" onClick={() => toggleTarget()}>
            {isWeekly() ? '月次を表示' : '週次を表示'}
          </a>
        </div>
        <p>
          <a href="#" onClick={() => setTarget('prev')}>
            &lt;&lt; Prev
          </a>
          {Object.keys(sprints).length !== 0 &&
            (isWeekly() ? `${sprints.startDate} (水) - ${sprints.endDate} (火)` : `${targetMonth}月`)}
          <a href="#" onClick={() => setTarget('next')}>
            Next &gt;&gt;
          </a>
        </p>
        {operations.length === 0 ? <p>No data was found in this term.</p> : <OperationList operations={operations} />}
      </section>
    </>
  )
}

export default OperationTerm
