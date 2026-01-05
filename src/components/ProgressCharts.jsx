import React from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import './ProgressCharts.css'

const COLORS = {
  primary: '#f5576c',
  secondary: '#4facfe',
  tertiary: '#43e97b',
  accent: '#f093fb',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#667eea'
}

function ProgressCharts({ habitProgress, dailyCompletion, overallCompletion }) {
  // Prepare data for habit progress bar chart
  const habitData = Object.entries(habitProgress).map(([habit, progress]) => ({
    habit: habit.length > 20 ? habit.substring(0, 20) + '...' : habit,
    fullHabit: habit,
    percentage: progress.percentage,
    completed: progress.completed,
    total: progress.total
  })).sort((a, b) => b.percentage - a.percentage)

  // Prepare data for daily completion line chart
  const dailyData = dailyCompletion.map(day => ({
    date: `${day.date.getDate()}/${day.date.getMonth() + 1}`,
    fullDate: day.date,
    percentage: day.percentage,
    completed: day.completed,
    total: day.total
  }))

  // Prepare data for pie chart with better colors
  const pieData = [
    { name: 'Completed', value: overallCompletion, color: COLORS.success },
    { name: 'Remaining', value: 100 - overallCompletion, color: '#f093fb' }
  ]

  const getBarColor = (percentage) => {
    if (percentage >= 80) return COLORS.success
    if (percentage >= 50) return COLORS.warning
    return COLORS.danger
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{data.fullHabit || data.fullDate?.toLocaleDateString()}</p>
          <p className="tooltip-value">
            {payload[0].value}% ({data.completed}/{data.total})
          </p>
        </div>
      )
    }
    return null
  }

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">{payload[0].value.toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="charts-container">
      <h2>Progress Visualizations</h2>
      
      <div className="charts-grid">
        {/* Pie Chart - Row 1 */}
        <div className="chart-card">
          <h3>Overall Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Row 2 */}
        <div className="chart-card">
          <h3>Habit Completion Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={habitData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
              <YAxis dataKey="habit" type="category" width={90} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
                {habitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Row 3 */}
        <div className="chart-card">
          <h3>Daily Completion Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval="preserveStartEnd"
                stroke="#6b7280"
              />
              <YAxis domain={[0, 100]} stroke="#6b7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke={COLORS.primary}
                strokeWidth={3}
                dot={{ fill: COLORS.primary, r: 5 }}
                activeDot={{ r: 7, fill: COLORS.primary }}
                name="Completion %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="progress-summary">
        <h3>Progress Summary</h3>
        <div className="summary-grid">
          {habitData.map((item, index) => (
            <div key={index} className="summary-item">
              <div className="summary-header">
                <span className="summary-habit">{item.fullHabit}</span>
                <span className="summary-percentage" style={{ color: getBarColor(item.percentage) }}>
                  {item.percentage}%
                </span>
              </div>
              <div className="summary-bar">
                <div 
                  className="summary-bar-fill"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: getBarColor(item.percentage)
                  }}
                />
              </div>
              <div className="summary-stats">
                {item.completed} of {item.total} days completed
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressCharts
