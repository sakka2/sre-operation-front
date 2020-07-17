import React, { useCallback } from 'react'

const User = ({ operations, user }) => {
  const totalOperationHours = operations.reduce((prev, x) => prev + x.operation_time, 0)
  const totalWorkingHours = operations.reduce((prev, x) => prev + 8, 0)
  const percentage = Math.round((totalOperationHours / totalWorkingHours) * 100 * 10) / 10

  const handleWarning = useCallback(() => {
    if (percentage > 50) return 'danger'
    if (percentage > 40) return 'caution'
    if (percentage > 30) return 'warn'
    return ''
  }, [percentage])

  const getDay = (date: string) => {
    const d = new Date(date)
    return ['日', '月', '火', '水', '木', '金', '土'][d.getDay()]
  }

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

        <div className="modal-wrapper" id={`${user.user_id}`}>
          <a href="#!" className="modal-overlay"></a>
          <div className="modal-window">
            <div className="modal-content">
              <h4>運用時間詳細</h4>
              {operations &&
                operations.map((operation) => (
                  <ul key={operation.operation_day}>
                    <li>
                      {operation.operation_day} ({getDay(operation.operation_day)})
                      <span>{operation.operation_time} / 8 (時間)</span>
                    </li>
                  </ul>
                ))}
            </div>
            <a href="#!" className="modal-close">
              ×
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default User
