# CSV Runner Dashboard

Hey there! 👋 This is my take on the CSV Runner Dashboard challenge. I built a web app that lets you upload running data in CSV format and visualize it with charts and metrics. Pretty handy for runners who want to track their progress!

Glimpse of the project:
<img width="1864" height="884" alt="image" src="https://github.com/user-attachments/assets/5cbe707d-3ad3-4e58-9a8f-9e7b793409fa" />


## What's This All About?

This project tackles the challenge of turning raw running data into meaningful insights. You simply upload a CSV with dates, runner names, and distances, and boom - you get beautiful visualizations and stats. No more staring at spreadsheets trying to make sense of your running habits!

## Assumptions I Made

Since the requirements didn't cover everything, I had to make some educated guesses:

- Your CSV will always have exactly three columns: `date`, `person`, and `miles`
- Dates should be formatted like `2023-01-15` (YYYY-MM-DD)
- Mile values are plain numbers (no units or text mixed in)
- You're cool with viewing data in a web browser (no mobile app needed)
- The dataset size will be reasonable (not millions of rows)

## What You Need Before Starting

Make sure you've got these installed:

- Node.js (I used version 18, but newer versions should work too)
- npm, yarn, or pnpm (I went with npm in the examples)
- A modern web browser (Chrome, Firefox, Safari, Edge - you know the drill)

No database setup needed - everything runs in the browser!

## Getting This Thing Running

### Install the Goods

```bash
npm install
```

That's it! All the dependencies will be downloaded and set up for you.

### Environment Stuff

I've included a `.env.example` file with some basic config. If you want to customize it:

```bash
cp .env.example .env
```

Then tweak the values in `.env` as needed. The defaults should work fine for most people.

### No Seed Data Needed

Since this is a client-side app that processes your CSV uploads, there's no need for seed data or initial user setup. Just upload your running data and you're good to go!

## Running and Testing

### Fire It Up

```bash
npm run dev
```

Then point your browser to `http://localhost:3000` and you should see the dashboard.

### How to Test It Works

Here's how to make sure everything's working properly:

1. **Upload functionality**: Try uploading the sample CSV (`public/sample-running-data.csv`)
2. **Data validation**: Upload a malformed CSV to see error handling
3. **Metrics calculation**: Check that totals, averages, min/max values look correct
4. **Charts rendering**: Make sure all graphs show up and display data properly
5. **Table sorting**: Click column headers to sort data ascending/descending

### Building for Production

When you're ready to deploy:

```bash
npm run build
```

Then to run the production version:

```bash
npm start
```

## What's Working vs. What's Missing

### ✅ What Works Well

- Drag-and-drop CSV uploads (so smooth!)
- Real-time data validation with helpful error messages
- Overall team metrics and individual runner stats
- Interactive charts that actually look nice
- Sortable data tables for drilling into details
- Fully responsive design (works on phones, tablets, desktops)
- Clean, accessible UI with proper contrast and focus states

### 🛑 Known Limitations

- No data persistence (refresh the page and start over)
- Single file uploads only (no batch processing)
- Limited chart types (just line and bar charts for now)
- No export functionality for processed data

### 🚀 Ideas for Future Improvements

If I had more time, I'd love to add:

- Data persistence with localStorage or a backend
- Multi-file upload support
- More chart types (pie charts, histograms, trend analysis)
- Date range filtering
- Data export options (PDF, Excel)
- Goal tracking features
- Social sharing capabilities

## How I Put This Together

### Folder Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # All the React components
│   ├── dashboard/    # Main dashboard pieces
│   └── ui/           # Reusable UI elements (from shadcn/ui)
├── lib/              # Helper functions and utilities
├── types/            # TypeScript type definitions
└── public/           # Static assets like images and sample data
```

### Key Tech Choices

- **Next.js** - Great for React apps with built-in routing and optimizations
- **TypeScript** - Catches errors early and makes code easier to maintain
- **Tailwind CSS** - Rapid styling without writing tons of CSS
- **shadcn/ui** - Beautiful, accessible UI components
- **Recharts** - Solid charting library that plays nice with React
- **PapaParse** - Reliable CSV parsing in the browser

### Data Flow

1. User uploads CSV → PapaParse handles the heavy lifting
2. Data gets validated → Bad rows get flagged with clear errors
3. Metrics calculated → Totals, averages, min/max for everyone
4. Charts rendered → Recharts makes pretty graphs from the data
5. Tables populated → Sortable view of all the raw numbers

## Making It Accessible and Usable

I tried to keep things friendly for everyone:

- **Keyboard navigation**: Tab through all interactive elements
- **Screen reader support**: Proper labels and ARIA attributes
- **Good contrast**: Text is readable against backgrounds
- **Focus indicators**: Clear outlines when elements are selected
- **Responsive sizing**: Works on different screen sizes
- **Clear typography**: Easy-to-read fonts and appropriate sizing
- **Helpful error messages**: Not just "something went wrong"

  LIVE DEMO - https://vercel.com/riyakumari001s-projects/csv

Hope you enjoy using this as much as I enjoyed building it! 🏃‍♂️💨
