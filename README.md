# Daily Habit / Goal Tracker

A modern, feature-rich React application for tracking daily habits and goals. This app replaces the Excel-based tracker with a beautiful, interactive web interface.

## Features

✅ **User Configuration**
- Set year and month for tracking
- Choose tracking period (7, 14, or 31 days)
- Add, edit, and remove habits dynamically

✅ **Habit Tracking Table**
- Checkbox-based tracking for each habit/day
- Visual feedback with green checkmarks for completed habits
- Sticky header and habit column for easy navigation
- Auto-generated dates based on configuration

✅ **Progress Calculations**
- Total completed count for each habit
- Completion percentage for each habit
- Daily completion percentage
- Overall completion percentage

✅ **Conditional Formatting**
- Green background for completed checkboxes
- Color-coded completion percentages:
  - 🟢 Green: 80% and above
  - 🟡 Yellow: 50-79%
  - 🔴 Red: Below 50%

✅ **Charts & Visualizations**
- Horizontal bar chart showing habit-wise completion progress
- Line chart showing daily completion trends
- Progress summary cards with visual progress bars
- All charts auto-update when data changes

✅ **Modern UI/UX**
- Beautiful gradient design
- Responsive layout (mobile-friendly)
- Smooth animations and transitions
- Clean, minimal interface

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Configure your tracker:**
   - Set the year and month
   - Choose how many days to track (7, 14, or 31)
   - Add your habits using the "Add Habit" button

2. **Track your habits:**
   - Click the checkboxes in the table to mark habits as completed
   - The progress calculations and charts update automatically

3. **Monitor your progress:**
   - View completion percentages in the table
   - Check the bar chart for habit-wise progress
   - Review the line chart for daily trends
   - See detailed summaries in the progress cards

## Project Structure

```
GoalTracker/
├── src/
│   ├── components/
│   │   ├── ConfigurationSection.jsx
│   │   ├── ConfigurationSection.css
│   │   ├── HabitTable.jsx
│   │   ├── HabitTable.css
│   │   ├── ProgressCharts.jsx
│   │   └── ProgressCharts.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Recharts** - Chart library for visualizations
- **CSS3** - Styling with modern features

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

## License

MIT

---

**Note:** This app stores data in browser memory. To persist data across sessions, you may want to add localStorage functionality in the future.

