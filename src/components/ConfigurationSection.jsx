import React from 'react'
import './ConfigurationSection.css'

function ConfigurationSection({
  year,
  setYear,
  month,
  setMonth,
  daysToTrack,
  setDaysToTrack,
  habits,
  setHabits
}) {
  const handleAddHabit = () => {
    const newHabit = prompt('Enter habit name:')
    if (newHabit && newHabit.trim()) {
      setHabits([...habits, newHabit.trim()])
    }
  }

  const handleRemoveHabit = (index) => {
    setHabits(habits.filter((_, i) => i !== index))
  }

  const handleEditHabit = (index) => {
    const newName = prompt('Enter new habit name:', habits[index])
    if (newName && newName.trim()) {
      const updated = [...habits]
      updated[index] = newName.trim()
      setHabits(updated)
    }
  }

  return (
    <div className="configuration-section">
      <h2>Configuration</h2>
      
      <div className="config-grid">
        <div className="config-item">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
            min="2020"
            max="2100"
          />
        </div>

        <div className="config-item">
          <label htmlFor="month">Month</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="config-item">
          <label htmlFor="days">Days to Track</label>
          <select
            id="days"
            value={daysToTrack}
            onChange={(e) => setDaysToTrack(parseInt(e.target.value))}
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="31">31 days</option>
          </select>
        </div>
      </div>

      <div className="habits-section">
        <div className="habits-header">
          <h3>Habits</h3>
          <button onClick={handleAddHabit} className="btn-add">
            + Add Habit
          </button>
        </div>
        
        <div className="habits-list">
          {habits.map((habit, index) => (
            <div key={index} className="habit-item">
              <span className="habit-name">{habit}</span>
              <div className="habit-actions">
                <button
                  onClick={() => handleEditHabit(index)}
                  className="btn-edit"
                  title="Edit habit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleRemoveHabit(index)}
                  className="btn-remove"
                  title="Remove habit"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          {habits.length === 0 && (
            <p className="no-habits">No habits added yet. Click "Add Habit" to get started.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConfigurationSection

