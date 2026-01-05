import React, { useState, useMemo, useEffect } from 'react'
import { FiSettings, FiCamera } from 'react-icons/fi'
import { FiTrendingUp, FiTarget, FiCalendar } from 'react-icons/fi'
import './App.css'
import HabitDrawer from './components/HabitDrawer'
import HabitTable from './components/HabitTable'
import ProgressCharts from './components/ProgressCharts'

function App() {
  // Get current date info
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  // Get number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Load from session storage or use defaults
  const loadFromSession = (key, defaultValue) => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      return defaultValue
    }
  }

  const saveToSession = (key, value) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to session storage:', error)
    }
  }

  const [habits, setHabits] = useState(() => 
    loadFromSession('habits', [
      'Exercise',
      'Read 30 minutes',
      'Meditation',
      'Drink 8 glasses of water',
      'No social media before noon'
    ])
  )
  const [trackingData, setTrackingData] = useState(() => 
    loadFromSession('trackingData', {})
  )

  // Save to session storage whenever habits or trackingData changes
  useEffect(() => {
    saveToSession('habits', habits)
  }, [habits])

  useEffect(() => {
    saveToSession('trackingData', trackingData)
  }, [trackingData])

  // Generate dates for current month (automatically uses current month)
  const dates = useMemo(() => {
    const dateArray = []
    const startDate = new Date(currentYear, currentMonth - 1, 1)
    
    for (let i = 0; i < daysInMonth; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      dateArray.push(currentDate)
    }
    
    return dateArray
  }, [currentYear, currentMonth, daysInMonth])

  // Handle checkbox toggle
  const handleToggle = (habitName, dateKey) => {
    setTrackingData(prev => {
      const key = `${habitName}-${dateKey}`
      const newData = {
        ...prev,
        [key]: !prev[key]
      }
      return newData
    })
  }

  // Calculate progress for each habit
  const habitProgress = useMemo(() => {
    const progress = {}
    
    habits.forEach(habit => {
      let completed = 0
      dates.forEach(date => {
        const dateKey = date.toISOString().split('T')[0]
        const key = `${habit}-${dateKey}`
        if (trackingData[key]) {
          completed++
        }
      })
      
      progress[habit] = {
        completed,
        total: dates.length,
        percentage: dates.length > 0 ? Math.round((completed / dates.length) * 100) : 0
      }
    })
    
    return progress
  }, [habits, dates, trackingData])

  // Calculate daily completion
  const dailyCompletion = useMemo(() => {
    return dates.map(date => {
      const dateKey = date.toISOString().split('T')[0]
      let completed = 0
      
      habits.forEach(habit => {
        const key = `${habit}-${dateKey}`
        if (trackingData[key]) {
          completed++
        }
      })
      
      return {
        date: date,
        dateKey: dateKey,
        completed,
        total: habits.length,
        percentage: habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0
      }
    })
  }, [dates, habits, trackingData])

  // Overall completion percentage
  const overallCompletion = useMemo(() => {
    const totalPossible = habits.length * dates.length
    if (totalPossible === 0) return 0
    
    let totalCompleted = 0
    habits.forEach(habit => {
      dates.forEach(date => {
        const dateKey = date.toISOString().split('T')[0]
        const key = `${habit}-${dateKey}`
        if (trackingData[key]) {
          totalCompleted++
        }
      })
    })
    
    return Math.round((totalCompleted / totalPossible) * 100)
  }, [habits, dates, trackingData])

  // Screenshot functionality
  const handleScreenshot = async () => {
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default
      const element = document.getElementById('app-content')
      
      if (!element) {
        alert('Error: Could not find content to screenshot')
        return
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#f5f7fa',
        scale: 2,
        logging: false,
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      })

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `habit-tracker-${new Date().toISOString().split('T')[0]}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    } catch (error) {
      console.error('Error taking screenshot:', error)
      alert('Error taking screenshot. Please make sure html2canvas is installed: npm install html2canvas')
    }
  }

  // Get month name
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December']
  const monthName = monthNames[currentMonth - 1]

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <div className="header-left">
            <div className="header-title-section">
              <h1>Habit Tracker</h1>
              <p className="month-indicator">
                <FiCalendar size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                {monthName} {currentYear}
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <FiTrendingUp size={18} />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Overall</div>
                  <div className="stat-value">{overallCompletion}%</div>
                </div>
              </div>
              <div className="stat-card secondary">
                <div className="stat-icon">
                  <FiTarget size={18} />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Habits</div>
                  <div className="stat-value">{habits.length}</div>
                </div>
              </div>
              <div className="stat-card tertiary">
                <div className="stat-icon">
                  <FiCalendar size={18} />
                </div>
                <div className="stat-content">
                  <div className="stat-label">Days</div>
                  <div className="stat-value">{dates.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <button onClick={handleScreenshot} className="btn-header btn-icon" title="Download Screenshot">
                <FiCamera size={18} />
              </button>
              <button 
                onClick={() => setIsDrawerOpen(true)} 
                className="btn-header btn-settings" 
                title="Manage Habits"
              >
                <FiSettings size={18} />
                Habits
              </button>
            </div>
          </div>
        </div>
      </header>

      <div id="app-content">
        <HabitTable
          habits={habits}
          dates={dates}
          trackingData={trackingData}
          habitProgress={habitProgress}
          dailyCompletion={dailyCompletion}
          onToggle={handleToggle}
        />

        <ProgressCharts
          habitProgress={habitProgress}
          dailyCompletion={dailyCompletion}
          overallCompletion={overallCompletion}
        />
      </div>

      <HabitDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        habits={habits}
        setHabits={setHabits}
      />
    </div>
  )
}

export default App
