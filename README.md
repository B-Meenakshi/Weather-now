🌤️ Weather Now — Open-Meteo Weather App

User Persona:
👤 Jamie, an outdoor enthusiast who wants to check current weather conditions quickly for any city.

🚀 Project Overview

Weather Now is a simple and fast weather application that allows users to:

Enter any city name

View current temperature, wind speed, and weather conditions

Fetch live weather data using the Open-Meteo API

🧠 Tech Stack

React.js (Vite)

Tailwind CSS for styling

Open-Meteo API for live weather data

Deployed on  Vercel

🔗 API Used

Open-Meteo API:
https://open-meteo.com/

Example endpoint:

https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current_weather=true


🏗️ Project Structure
- `App.jsx` → Fetches data from Open-Meteo APIs and manages state  
- `WeatherDisplay.jsx` → Displays city name, temperature, weather description, etc.  
- `styles.css` → Contains responsive design and input/output styles  
- `main.jsx` → Bootstraps React app into the DOM  
- `vite.config.js` → Vite setup for fast build and dev server  
- `README.md` → Explains project, setup, and deployment 
⚙️ How to Run Locally

Install dependencies

npm install

Run the app

npm run dev

Open the app in your browser → http://localhost:5173

Clone this repository

git clone https://github.com/yourusername/weather-now.git
cd weather-now


🌐 Deployment

Vercel: https://vercel.com/

🧠 Key Learnings

How to use Open-Meteo API for live data fetching.

Using React hooks (useState, useEffect) for API integration.

Applying Tailwind CSS for clean, responsive UI.

Deploying modern web apps on Vercel 
