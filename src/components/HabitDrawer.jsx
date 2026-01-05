import React, { useState } from 'react'
import { FiX, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import './HabitDrawer.css'

function HabitDrawer({ isOpen, onClose, habits, setHabits }) {
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

  if (!isOpen) return null

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="habit-drawer">
        <div className="drawer-header">
          <h2>Manage Habits</h2>
          <button onClick={onClose} className="drawer-close-btn" aria-label="Close drawer">
            <FiX size={24} />
          </button>
        </div>

        <div className="drawer-content">
          {!isAdding && editingIndex === null && (
            <button onClick={handleAddClick} className="btn-add-habit-drawer">
              <FiPlus size={20} />
              Add New Habit
            </button>
          )}

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
            {habits.length === 0 && !isAdding && (
              <p className="no-habits">No habits added yet. Click "Add New Habit" to get started.</p>
            )}
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
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        className="btn-remove"
                        title="Remove habit"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HabitDrawer

