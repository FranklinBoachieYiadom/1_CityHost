# 1 city_host - Mental Health Awareness NGO Website

## Overview
This is a professional, responsive, and animated website for MindfulHaven, a fictional non-governmental organization (NGO) dedicated to promoting mental health awareness. The website is built using HTML5, Tailwind CSS, and vanilla JavaScript (ES6+), featuring a multi-page structure for better organization and user experience.

## Technologies Used
- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript (ES6+)
- AOS Animation Library
- Font Awesome Icons
- Google Fonts (Inter, Poppins)

## License
This project was designed by Phlashly

## Installation Tips for Tailwind Css and autoprefixer
 

1. Here’s how to install Tailwind CSS via npm and set up a build tool (PostCSS) for your project, locally:
- npm init -y
- npm install tailwindcss@3 postcss autoprefixer
- npx tailwindcss init -p

2. Create a file called src/input.css 
- Then copy and paste the following
@tailwind base;
@tailwind components;
@tailwind utilities;

3. Configure Tailwind to scan your HTML files
- In tailwind.config.js, add the following
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

4. Add a build script to your package.json
// In package.json
"scripts": {
  "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
}

5. After you are done with you styling
- npm run build:css

6. Include the built CSS in your HTML
<link href="dist/output.css" rel="stylesheet">


## While in Development mode, to see your styling changes

1. Add a watch script to your package.json:

"scripts": {
  "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify",
  "watch:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch"
}

2. Run the watch script in your terminal:
- npm run watch:css
This will keep running and automatically rebuild your CSS whenever you save changes to your HTML, JS, or CSS files.


# Always remember to before pushing your code, else, sometimes you may not see your styling changes

## run build css
npm run build:css
