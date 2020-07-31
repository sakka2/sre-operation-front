import React, { useCallback } from 'react'
import OperationDetail from './OperationDetail'

const OperationSummary = ({ operations, user }) => {
  const totalOperationHours = operations.reduce((prev, x) => prev + x.operation_time, 0)
  const totalWorkingHours = operations.reduce((prev) => prev + 8, 0)
  const percentage = Math.round((totalOperationHours / totalWorkingHours) * 100 * 10) / 10

  const handleWarning = useCallback(() => {
    if (percentage > 50) return 'danger'
    if (percentage > 40) return 'caution'
    if (percentage > 30) return 'warn'

    return ''
  }, [percentage])

  return (
    <>
      <div className={`metric ${handleWarning()}`}>
        <a href={`#${user.user_id}`}></a>
        <h3>{user.user_id}</h3>
        <h2>
          {percentage}
          <span>%</span>
        </h2>
        <p>
          {totalOperationHours} / {totalWorkingHours.toFixed(1)} <span>(時間)</span>
        </p>
        <OperationDetail user={user} operations={operations} />
      </div>
    </>
  )
}

export default OperationSummary
