import React from "react";
import Education from "./components/Education";

const App: React.FC = () => {
  return (
    <div>
      {/* Other sections of your website */}
      <Education />
      {/* Other sections of your website */}
    </div>
  );
};

export default App;

{
  "name": "willpelech-portfolio",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://WillPelech.github.io",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "gh-pages": "^5.0.0"
  }
}