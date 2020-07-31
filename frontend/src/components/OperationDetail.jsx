import React from 'react'

const OperationDetail = ({ user, operations }) => {
  const getDay = (date) => {
    const d = new Date(date)

    return ['日', '月', '火', '水', '木', '金', '土'][d.getDay()]
  }

  return (
    <>
      <div className="modal-wrapper" id={`${user.user_id}`}>
        <a href="#!" className="modal-overlay"></a>
        <div className="modal-window">
          <div className="modal-content">
            <h4>運用時間詳細</h4>
            {operations.map((operation) => (
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
    </>
  )
}

export default OperationDetail
