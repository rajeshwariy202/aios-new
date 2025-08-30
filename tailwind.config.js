/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

   presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:'#030015',
        accent:"#E12A6D",

        light:{
          100:'#D6D6FF',
          200:'#A8B5DB',
          300:'#9CA4AB'
        },
        dark:{
          100:'#221f3d',
          200:'#0f0d23',
        
        }
      }
    },
  },
  plugins: [],
};
