import React, { useState } from 'react'
import './HabitManager.css'

function HabitManager({ habits, setHabits }) {
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const handleAddClick = () => {
    setInputValue('')
    setIsAdding(true)
    setEditingIndex(null)
  }

  const handleEditClick = (index) => {
    setInputValue(habits[index])
    setEditingIndex(index)
    setIsAdding(false)
  }

  const handleSave = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      if (editingIndex !== null) {
        // Edit existing habit
        const updated = [...habits]
        updated[editingIndex] = trimmedValue
        setHabits(updated)
        setEditingIndex(null)
      } else {
        // Add new habit
        setHabits([...habits, trimmedValue])
        setIsAdding(false)
      }
      setInputValue('')
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingIndex(null)
    setInputValue('')
  }

  const handleRemove = (index) => {
    if (window.confirm(`Are you sure you want to remove "${habits[index]}"?`)) {
      setHabits(habits.filter((_, i) => i !== index))
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="habit-manager">
      <div className="habit-manager-header">
        <h3>Manage Habits</h3>
        {!isAdding && editingIndex === null && (
          <button onClick={handleAddClick} className="btn-add-habit">
            + Add Habit
          </button>
        )}
      </div>

      {(isAdding || editingIndex !== null) && (
        <div className="habit-input-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter habit name..."
            className="habit-input"
            autoFocus
          />
          <div className="habit-input-actions">
            <button onClick={handleSave} className="btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="habits-list">
        {habits.map((habit, index) => (
          <div key={index} className="habit-item">
            <span className="habit-name">{habit}</span>
            <div className="habit-actions">
              {editingIndex !== index && (
                <>
                  <button
                    onClick={() => handleEditClick(index)}
                    className="btn-edit"
                    title="Edit habit"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    className="btn-remove"
                    title="Remove habit"
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {habits.length === 0 && !isAdding && (
          <p className="no-habits">No habits added yet. Click "Add Habit" to get started.</p>
        )}
      </div>
    </div>
  )
}

export default HabitManager

