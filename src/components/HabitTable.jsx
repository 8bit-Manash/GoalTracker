import React from 'react'
import './HabitTable.css'

function HabitTable({ habits, dates, trackingData, habitProgress, dailyCompletion, onToggle }) {
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[date.getMonth()]
    return `${day} ${month}`
  }

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return '#10b981'
    if (percentage >= 50) return '#f59e0b'
    return '#ef4444'
  }

  // Check if a date is in the future
  const isFutureDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate > today
  }

  return (
    <div className="habit-table-container">
      <h2>Habit Tracking</h2>
      <div className="table-wrapper">
        <table className="habit-table">
          <thead>
            <tr>
              <th className="sticky-col habit-col">Habit</th>
              {dates.map((date, idx) => (
                <th key={idx} className="date-header">
                  {formatDate(date)}
                </th>
              ))}
              <th className="sticky-col progress-col">Total</th>
              <th className="sticky-col progress-col">Completion %</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, habitIdx) => {
              const progress = habitProgress[habit] || { completed: 0, total: 0, percentage: 0 }
              const completionColor = getCompletionColor(progress.percentage)
              
              return (
                <tr key={habitIdx}>
                  <td className="sticky-col habit-col habit-name-cell">
                    {habit}
                  </td>
                  {dates.map((date, dateIdx) => {
                    const dateKey = date.toISOString().split('T')[0]
                    const key = `${habit}-${dateKey}`
                    const isChecked = trackingData[key] || false
                    const isFuture = isFutureDate(date)
                    
                    return (
                      <td 
                        key={dateIdx} 
                        className={`checkbox-cell ${isChecked ? 'checked-cell' : ''} ${isFuture ? 'future-date' : ''}`}
                      >
                        <label className={`checkbox-label ${isFuture ? 'disabled' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => !isFuture && onToggle(habit, dateKey)}
                            className="checkbox-input"
                            disabled={isFuture}
                          />
                          <span className={`checkbox-custom ${isChecked ? 'checked' : ''} ${isFuture ? 'disabled' : ''}`}>
                            {isChecked && '✓'}
                          </span>
                        </label>
                      </td>
                    )
                  })}
                  <td className="sticky-col progress-col total-cell">
                    {progress.completed} / {progress.total}
                  </td>
                  <td 
                    className="sticky-col progress-col percentage-cell"
                    style={{ backgroundColor: `${completionColor}20`, color: completionColor }}
                  >
                    {progress.percentage}%
                  </td>
                </tr>
              )
            })}
            
            {/* Daily Completion Row */}
            {habits.length > 0 && (
              <tr className="daily-completion-row">
                <td className="sticky-col habit-col habit-name-cell daily-completion-label">
                  Daily Completion %
                </td>
                {dates.map((date, dateIdx) => {
                  const daily = dailyCompletion[dateIdx] || { percentage: 0 }
                  const completionColor = getCompletionColor(daily.percentage)
                  
                  return (
                    <td 
                      key={dateIdx} 
                      className="daily-completion-cell"
                      style={{ 
                        backgroundColor: `${completionColor}20`, 
                        color: completionColor,
                        fontWeight: 600
                      }}
                    >
                      {daily.percentage}%
                    </td>
                  )
                })}
                <td className="sticky-col progress-col total-cell">-</td>
                <td className="sticky-col progress-col percentage-cell">-</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HabitTable
