# AI Trip Planner 🗺️✨

An AI-powered trip planning app built with **React** and **Gemini API**.  
It helps users create personalized travel plans in just a few clicks.  

## ✨ Features
- Select your **Destination** 🌍  
- Choose **Number of Days** 📅  
- Set a **Budget** 💰 (Cheap / Moderate / Expensive)  
- Pick your **Travelers** 👥 (Solo / Couple / Family / Friends)  

Based on the inputs, the app generates:
- 📌 A **personalized travel itinerary**
- 🏨 **Hotel recommendations**
- 🗺️ **Daily activities & places to explore**

All generated plans are stored securely using **Firebase**.

---

## 🛠 Tech Stack
- **React** – Frontend  
- **Gemini API** – AI-powered trip generation  
- **Firebase** – Database & Authentication  
- **Tailwind / Material UI** – UI styling  

---

## 🚀 Setup Instructions 
 - git clone https://github.com/uttambarve/ai-trip-planner.git
 - cd ai-trip-planner
 - npm install
 - Create a .env file in the project root and add your API keys:
 - env:
   - VITE_GEMINI_API_KEY=your_gemini_api_key
   - VITE_FIREBASE_API_KEY=your_firebase_api_key
 - Run the development server
 - npm start
