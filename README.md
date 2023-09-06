Quizzical
-----

### Introduction
On coming across the Open Trivia DB API, I thought of building a quiz app that you can use to test your knowledge in a variety of fields. This project was my first attempt to properly document my commit messages, fetch data from an API in React, and learn enough of a problematic concept to write a comprehensive article on it [https://opeyimikaaremu.hashnode.dev/stop-double-rendering-in-react-with-useeffect-proven-fixes]

This project involved building a responsive webpage that alternates between components using React and Vanilla CSS. It also requires fetching data from the Open Trivia DB API.

### Overview
Quizzical is _that_ quiz app that makes it super easy for you to learn something new. Just answer our 5 questions, click the submit button, immediately get feedback on what you got right or wrong, and try again.

- It fetches 5 questions asynchronously at once from Open Trivia DB API
- It randomizes the options so a user cannot attempt to game the system after taking the quiz multiple times
- HTML entities in the data fetched from the API is converted to readable text
- Upon submitting, the user gets feedback on the options he got right and those he/she chose wrongly via colour change
- The user also gets to see their score for each trial and can easily try again

### Demo 
![Demo of Quizzical](./src/assets/quizzical.gif)


### Tech Stack

- **React** - Framework for website functionality
- **Vanilla CSS** - Styling the page
- **Open Trivia DB API** - API for getting quiz questions

### Main Files: Project Structure

  ```sh
  ├── index.html
  ├── gitignore
  ├── package.lock-json
  ├── package.json
  ├── vite.config.js
  ├── src
  │   ├── assets
  │   ├── App.jsx 
  │   ├── App.css
  │   ├── index.css
  │   └── main.jsx
  └── components
      ├── Home.jsx - Contains the code for the Home/Welcome page
      ├── Question.jsx - Contains the code that displays the questions & options and validation of answers happens here
      └── Quiz.jsx - Contains the code that fetches the questions and parses it in a way that the Question component can work with
  ```

Overall:
* Structure and Logic is located in the components.
* Switching between Home and Quiz components is located in `app.jsx`.

### Development Setup

1. Clone the repo

```
$ git clone https://github.com/Opeyimika-sudo/Quizzical.git quizzical
$ cd quizzical
```

2. Install the dependencies:

```
$ npm install
```

3. Run the development server:

```
$ npm run dev
```

4. Navigate to the Home page [http://localhost:5173](http://localhost:5173)

### Potential Additional Features
  
1. Write tests using Jest for the app
2. Keep a graph of the user's performances over time keeping stock of his top and low performances
3. Add dark mode

