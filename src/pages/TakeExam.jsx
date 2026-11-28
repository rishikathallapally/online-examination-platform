
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Send,
  AlertCircle,
} from "lucide-react";

// Questions for each examination
const questionBank = {
  "JavaScript Fundamentals": [
    { id: 1, question: "Which keyword is used to declare a variable in JavaScript?", options: ["define", "let", "variable", "dim"], answer: "let" },
    { id: 2, question: "Which of the following is a JavaScript data type?", options: ["Number", "Color", "Font", "Style"], answer: "Number" },
    { id: 3, question: "Which symbol is used for strict equality?", options: ["=", "==", "===", "!="], answer: "===" },
    { id: 4, question: "Which method adds an element to the end of an array?", options: ["pop()", "push()", "shift()", "slice()"], answer: "push()" },
    { id: 5, question: "Which keyword is used to create a function?", options: ["function", "method", "create", "define"], answer: "function" },
    { id: 6, question: "Which method displays a message in the browser console?", options: ["console.log()", "print()", "display()", "show()"], answer: "console.log()" },
    { id: 7, question: "Which symbol is used for a single-line comment?", options: ["<!-- -->", "//", "/* */", "#"], answer: "//" },
    { id: 8, question: "What is the result of 10 + 5?", options: ["105", "15", "5", "Error"], answer: "15" },
    { id: 9, question: "Which value represents an intentional absence of a value?", options: ["undefined", "null", "false", "0"], answer: "null" },
    { id: 10, question: "Which operator checks whether two values are not equal?", options: ["==", "===", "!=", "&&"], answer: "!=" },
    { id: 11, question: "Which loop runs while a condition is true?", options: ["if", "while", "switch", "return"], answer: "while" },
    { id: 12, question: "Which method removes the last element from an array?", options: ["push()", "shift()", "pop()", "unshift()"], answer: "pop()" },
    { id: 13, question: "Which keyword declares a block-scoped constant?", options: ["var", "let", "const", "static"], answer: "const" },
    { id: 14, question: "Which operator is used for logical AND?", options: ["||", "&&", "!", "??"], answer: "&&" },
    { id: 15, question: "Which method converts a string into an integer?", options: ["parseInt()", "toString()", "parseFloat()", "NumberText()"], answer: "parseInt()" },
    { id: 16, question: "What does typeof return?", options: ["The data type of a value", "The value's length", "The variable name", "The memory address"], answer: "The data type of a value" },
    { id: 17, question: "Which array property returns the number of elements?", options: ["size", "count", "length", "total"], answer: "length" },
    { id: 18, question: "Which statement is used to make a decision?", options: ["for", "if", "break", "continue"], answer: "if" },
    { id: 19, question: "What is the result of Boolean(0)?", options: ["true", "false", "null", "undefined"], answer: "false" },
    { id: 20, question: "Which method converts a JavaScript object into JSON text?", options: ["JSON.parse()", "JSON.stringify()", "Object.toJSON()", "JSON.convert()"], answer: "JSON.stringify()" },
  ],

  "React Development": [
    { id: 1, question: "What is React primarily used for?", options: ["Building user interfaces", "Managing databases", "Creating operating systems", "Writing SQL queries"], answer: "Building user interfaces" },
    { id: 2, question: "What is a React component?", options: ["A reusable UI building block", "A database table", "A CSS property", "A browser"], answer: "A reusable UI building block" },
    { id: 3, question: "Which hook is used to manage state in a functional component?", options: ["useEffect", "useState", "useNavigate", "useRef"], answer: "useState" },
    { id: 4, question: "How do you pass data from a parent to a child component?", options: ["Props", "CSS", "Routes", "LocalStorage"], answer: "Props" },
    { id: 5, question: "Which method is commonly used to render a list in React?", options: ["map()", "push()", "alert()", "prompt()"], answer: "map()" },
    { id: 6, question: "What is JSX?", options: ["A syntax extension for JavaScript", "A database language", "A CSS framework", "A browser extension"], answer: "A syntax extension for JavaScript" },
    { id: 7, question: "Which command creates a new React project using Vite?", options: ["npm create vite@latest", "npm start react", "react install", "create-react-app vite"], answer: "npm create vite@latest" },
    { id: 8, question: "Why do React list elements need keys?", options: ["To help React identify elements", "To add CSS styles", "To create routes", "To store passwords"], answer: "To help React identify elements" },
    { id: 9, question: "What is the virtual DOM?", options: ["A lightweight representation of the UI", "A physical computer component", "A database", "A CSS file"], answer: "A lightweight representation of the UI" },
    { id: 10, question: "What is the correct way to update state?", options: ["Directly change the variable", "Use the state setter function", "Refresh the browser", "Change the HTML manually"], answer: "Use the state setter function" },
    { id: 11, question: "Which prop is used to pass children into a component?", options: ["content", "children", "innerHTML", "component"], answer: "children" },
    { id: 12, question: "What does conditional rendering mean?", options: ["Displaying UI based on a condition", "Rendering every component twice", "Removing all CSS", "Creating a database"], answer: "Displaying UI based on a condition" },
    { id: 13, question: "Which syntax is used to add a JavaScript expression in JSX?", options: ["()", "{}", "[]", "<>"], answer: "{}" },
    { id: 14, question: "What is the default export used for?", options: ["Exporting one main value from a module", "Creating a CSS class", "Deleting a component", "Starting a server"], answer: "Exporting one main value from a module" },
    { id: 15, question: "Which attribute is used instead of class in JSX?", options: ["class", "className", "cssClass", "styleClass"], answer: "className" },
    { id: 16, question: "What is React Router used for?", options: ["Navigation between pages", "Database management", "Image editing", "Styling components"], answer: "Navigation between pages" },
    { id: 17, question: "What is a controlled component?", options: ["A component whose form values are managed by React state", "A component without JSX", "A component that cannot update", "A CSS component"], answer: "A component whose form values are managed by React state" },
    { id: 18, question: "Which event handles a form submission in React?", options: ["onClick", "onSubmit", "onChange", "onLoad"], answer: "onSubmit" },
    { id: 19, question: "What does the useEffect hook commonly handle?", options: ["Side effects", "CSS animations only", "HTML parsing", "Database creation"], answer: "Side effects" },
    { id: 20, question: "What is the purpose of Fragment in React?", options: ["Group elements without an extra DOM element", "Create a new browser window", "Add CSS styles", "Store component state"], answer: "Group elements without an extra DOM element" },
    { id: 21, question: "Which hook stores a mutable reference?", options: ["useState", "useRef", "useEffect", "useContext"], answer: "useRef" },
    { id: 22, question: "What happens when a component's state changes?", options: ["React schedules a re-render", "The browser closes", "The component is deleted permanently", "The CSS file is removed"], answer: "React schedules a re-render" },
    { id: 23, question: "Which file commonly contains the root React rendering code in Vite?", options: ["index.html", "main.jsx", "package.json", "style.css"], answer: "main.jsx" },
    { id: 24, question: "What is the purpose of lifting state up?", options: ["Sharing state between related components", "Making text larger", "Creating a new HTML element", "Removing props"], answer: "Sharing state between related components" },
    { id: 25, question: "Which command installs a package using npm?", options: ["npm install", "npm remove all", "npm create", "npm open"], answer: "npm install" },
  ],

  "HTML & CSS Mastery": [
    { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Home Text Markup Language"], answer: "Hyper Text Markup Language" },
    { id: 2, question: "Which HTML element is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
    { id: 3, question: "Which CSS property changes the text color?", options: ["font-style", "background", "color", "text-size"], answer: "color" },
    { id: 4, question: "Which CSS layout system is useful for arranging items in a row or column?", options: ["Float", "Flexbox", "Outline", "Border"], answer: "Flexbox" },
    { id: 5, question: "Which CSS rule helps create responsive layouts?", options: ["@media", "@import", "@font-face", "@keyframes"], answer: "@media" },
    { id: 6, question: "Which HTML element contains the main page content?", options: ["<head>", "<main>", "<meta>", "<title>"], answer: "<main>" },
    { id: 7, question: "Which HTML attribute provides alternative text for an image?", options: ["src", "href", "alt", "title"], answer: "alt" },
    { id: 8, question: "Which CSS property controls the space inside an element's border?", options: ["margin", "padding", "outline", "gap"], answer: "padding" },
    { id: 9, question: "Which CSS property controls the space outside an element?", options: ["padding", "margin", "width", "border"], answer: "margin" },
    { id: 10, question: "Which HTML element creates an unordered list?", options: ["<ol>", "<ul>", "<li>", "<dl>"], answer: "<ul>" },
    { id: 11, question: "Which CSS property changes the font size?", options: ["font-size", "text-style", "font-weight", "text-color"], answer: "font-size" },
    { id: 12, question: "Which HTML element is used to create a form?", options: ["<input>", "<form>", "<label>", "<button>"], answer: "<form>" },
    { id: 13, question: "Which CSS property makes text bold?", options: ["font-style", "font-weight", "text-align", "text-decoration"], answer: "font-weight" },
    { id: 14, question: "Which CSS property aligns items along the main axis in Flexbox?", options: ["align-items", "justify-content", "flex-wrap", "position"], answer: "justify-content" },
    { id: 15, question: "Which CSS unit is relative to the root font size?", options: ["px", "em", "rem", "%"], answer: "rem" },
    { id: 16, question: "Which HTML element represents the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: "<h1>" },
    { id: 17, question: "Which CSS property sets an element's background color?", options: ["color", "background-color", "font-color", "fill"], answer: "background-color" },
    { id: 18, question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style System", "Creative Styling Syntax", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
    { id: 19, question: "Which HTML element creates a line break?", options: ["<break>", "<br>", "<hr>", "<lb>"], answer: "<br>" },
    { id: 20, question: "Which CSS property controls how an element is positioned?", options: ["display", "position", "float", "overflow"], answer: "position" },
  ],

  "JavaScript Advanced": [
    { id: 1, question: "Which method creates a new array by transforming each element?", options: ["filter()", "map()", "push()", "pop()"], answer: "map()" },
    { id: 2, question: "What does Promise.all() do?", options: ["Runs promises one by one", "Waits for all promises to fulfill", "Creates a new function", "Deletes promises"], answer: "Waits for all promises to fulfill" },
    { id: 3, question: "Which keyword pauses execution inside an async function?", options: ["wait", "pause", "await", "stop"], answer: "await" },
    { id: 4, question: "What is a closure in JavaScript?", options: ["A function with access to its outer scope", "A type of loop", "An array method", "A CSS selector"], answer: "A function with access to its outer scope" },
    { id: 5, question: "Which method filters array elements based on a condition?", options: ["map()", "filter()", "join()", "reduce()"], answer: "filter()" },
    { id: 6, question: "What is the purpose of the reduce() method?", options: ["To create a single accumulated value", "To remove the last element", "To sort an array", "To reverse a string"], answer: "To create a single accumulated value" },
    { id: 7, question: "What does the spread operator (...) do?", options: ["Expands iterable values", "Deletes an object", "Creates a loop", "Stops execution"], answer: "Expands iterable values" },
    { id: 8, question: "Which method converts JSON text into a JavaScript value?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.read()"], answer: "JSON.parse()" },
    { id: 9, question: "What is event bubbling?", options: ["An event moving from a child toward its ancestors", "An event being deleted", "An event running only once", "A CSS animation"], answer: "An event moving from a child toward its ancestors" },
    { id: 10, question: "Which method prevents an event's default browser action?", options: ["stopPropagation()", "preventDefault()", "stopDefault()", "cancelEvent()"], answer: "preventDefault()" },
    { id: 11, question: "What does the optional chaining operator (?.) do?", options: ["Safely accesses nested properties", "Adds two values", "Declares a variable", "Creates an array"], answer: "Safely accesses nested properties" },
    { id: 12, question: "Which keyword creates a class in JavaScript?", options: ["object", "class", "constructor", "prototype"], answer: "class" },
    { id: 13, question: "What is destructuring?", options: ["Extracting values from arrays or objects", "Deleting an object", "Combining strings", "Creating a loop"], answer: "Extracting values from arrays or objects" },
    { id: 14, question: "Which method checks whether at least one array element passes a test?", options: ["every()", "some()", "map()", "join()"], answer: "some()" },
    { id: 15, question: "What does the finally() method do on a Promise?", options: ["Runs cleanup code after settlement", "Always rejects the Promise", "Deletes the Promise", "Converts it into an array"], answer: "Runs cleanup code after settlement" },
    { id: 16, question: "Which method returns a new array containing selected elements?", options: ["slice()", "splice()", "push()", "pop()"], answer: "slice()" },
    { id: 17, question: "What does the this keyword generally refer to?", options: ["The current execution context's this value", "The next function", "The document title", "The current array length"], answer: "The current execution context's this value" },
    { id: 18, question: "What is a callback function?", options: ["A function passed to another function", "A function that deletes data", "A function without parameters", "A CSS function"], answer: "A function passed to another function" },
    { id: 19, question: "Which built-in object provides date and time functionality?", options: ["Time", "Calendar", "Date", "Clock"], answer: "Date" },
    { id: 20, question: "What does the filter() method return?", options: ["A new array", "A single number", "A string", "A boolean only"], answer: "A new array" },
    { id: 21, question: "What is the purpose of a JavaScript module?", options: ["To organize and reuse code", "To change browser settings", "To create CSS animations", "To store images"], answer: "To organize and reuse code" },
    { id: 22, question: "Which keyword exports a named value from a module?", options: ["import", "export", "require", "include"], answer: "export" },
    { id: 23, question: "What does Array.isArray() check?", options: ["Whether a value is an array", "Whether a value is a string", "Whether an object is empty", "Whether a number is positive"], answer: "Whether a value is an array" },
    { id: 24, question: "Which method combines two or more arrays into a new array?", options: ["concat()", "join()", "split()", "shift()"], answer: "concat()" },
    { id: 25, question: "What does the nullish coalescing operator (??) check?", options: ["Whether a value is null or undefined", "Whether a value is zero", "Whether a string is empty", "Whether two values are equal"], answer: "Whether a value is null or undefined" },
    { id: 26, question: "Which Promise method handles a rejected Promise?", options: ["then()", "catch()", "map()", "filter()"], answer: "catch()" },
    { id: 27, question: "What is the purpose of Object.keys()?", options: ["Returns an array of an object's own enumerable property names", "Deletes object properties", "Returns all object values", "Creates a new class"], answer: "Returns an array of an object's own enumerable property names" },
    { id: 28, question: "Which method executes a function for each array element?", options: ["forEach()", "find()", "reduce()", "sort()"], answer: "forEach()" },
    { id: 29, question: "What does setTimeout() do?", options: ["Schedules a function to run after a delay", "Runs a function continuously", "Stops all JavaScript", "Creates a Promise automatically"], answer: "Schedules a function to run after a delay" },
    { id: 30, question: "Which statement exits a loop immediately?", options: ["continue", "return", "break", "skip"], answer: "break" },
  ],

  "Tailwind CSS": [
    { id: 1, question: "What is Tailwind CSS?", options: ["A JavaScript library", "A utility-first CSS framework", "A database", "A programming language"], answer: "A utility-first CSS framework" },
    { id: 2, question: "Which Tailwind class adds a purple background?", options: ["text-purple-500", "bg-purple-500", "color-purple", "purple-bg"], answer: "bg-purple-500" },
    { id: 3, question: "Which prefix applies styles at the medium breakpoint?", options: ["sm:", "lg:", "md:", "xl:"], answer: "md:" },
    { id: 4, question: "Which class makes an element a flex container?", options: ["grid", "flex", "block", "inline"], answer: "flex" },
    { id: 5, question: "Which class adds rounded corners?", options: ["shadow-lg", "border", "rounded-lg", "p-4"], answer: "rounded-lg" },
    { id: 6, question: "Which class adds padding of 1rem on all sides?", options: ["m-4", "p-4", "gap-4", "px-4"], answer: "p-4" },
    { id: 7, question: "Which class makes text bold?", options: ["text-bold", "font-bold", "bold", "weight-bold"], answer: "font-bold" },
    { id: 8, question: "Which class sets a white background?", options: ["text-white", "bg-white", "white-bg", "background-white"], answer: "bg-white" },
    { id: 9, question: "Which class creates a CSS grid container?", options: ["flex", "grid", "columns", "grid-layout"], answer: "grid" },
    { id: 10, question: "Which class adds a shadow?", options: ["shadow", "border-shadow", "box", "outline-shadow"], answer: "shadow" },
    { id: 11, question: "Which class centers text?", options: ["text-middle", "text-center", "center-text", "align-center"], answer: "text-center" },
    { id: 12, question: "Which prefix applies styles at the small breakpoint?", options: ["md:", "lg:", "sm:", "xl:"], answer: "sm:" },
    { id: 13, question: "Which class makes an element take the full width?", options: ["w-full", "w-screen", "width-full", "full-width"], answer: "w-full" },
    { id: 14, question: "Which class hides an element?", options: ["hidden", "invisible", "remove", "display-none"], answer: "hidden" },
    { id: 15, question: "Which class adds a top margin of 1rem?", options: ["pt-4", "mt-4", "mb-4", "ml-4"], answer: "mt-4" },
    { id: 16, question: "Which class makes an element's corners fully rounded?", options: ["rounded-sm", "rounded-md", "rounded-full", "rounded-none"], answer: "rounded-full" },
    { id: 17, question: "Which prefix applies styles only when an element is hovered?", options: ["focus:", "active:", "hover:", "visited:"], answer: "hover:" },
    { id: 18, question: "Which class changes the text color to blue?", options: ["bg-blue-500", "text-blue-500", "blue-text", "color-blue"], answer: "text-blue-500" },
    { id: 19, question: "Which class sets a flex container's items to the center of the cross axis?", options: ["justify-center", "items-center", "content-center", "self-center"], answer: "items-center" },
    { id: 20, question: "Which class adds a gap of 1rem between flex or grid items?", options: ["space-4", "gap-4", "margin-4", "padding-4"], answer: "gap-4" },
  ],

  "React Hooks & State Management": [
    { id: 1, question: "What are React Hooks?", options: ["Functions that let components use React features", "CSS properties", "HTML elements", "Database commands"], answer: "Functions that let components use React features" },
    { id: 2, question: "Which hook is used to manage component state?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useState" },
    { id: 3, question: "When does useEffect run by default?", options: ["Only once", "After every render", "Before the first render", "Only when the page closes"], answer: "After every render" },
    { id: 4, question: "Which hook is used to access a DOM element directly?", options: ["useState", "useEffect", "useRef", "useContext"], answer: "useRef" },
    { id: 5, question: "What is the purpose of useContext?", options: ["To style components", "To share data without passing props through every level", "To create HTML elements", "To store data in a database"], answer: "To share data without passing props through every level" },
    { id: 6, question: "What does the useState hook return?", options: ["A state value and a setter function", "Only a string", "A CSS class", "A route object"], answer: "A state value and a setter function" },
    { id: 7, question: "What is the purpose of the dependency array in useEffect?", options: ["To control when the effect runs", "To style a component", "To create a new component", "To delete state"], answer: "To control when the effect runs" },
    { id: 8, question: "How can you run an effect after the initial render only?", options: ["Pass an empty dependency array", "Pass no dependency array", "Remove useEffect", "Use useState"], answer: "Pass an empty dependency array" },
    { id: 9, question: "What does a useEffect cleanup function commonly do?", options: ["Cleans up subscriptions or timers", "Creates a new component", "Updates CSS", "Changes the page title automatically"], answer: "Cleans up subscriptions or timers" },
    { id: 10, question: "Can React Hooks be called inside an if statement?", options: ["Yes, always", "No, Hooks must follow the Rules of Hooks", "Only useState can", "Only useEffect can"], answer: "No, Hooks must follow the Rules of Hooks" },
    { id: 11, question: "Which hook helps share data across deeply nested components?", options: ["useRef", "useContext", "useMemo", "useState"], answer: "useContext" },
    { id: 12, question: "Which hook is useful for complex state update logic?", options: ["useReducer", "useRef", "useEffect", "useMemo"], answer: "useReducer" },
    { id: 13, question: "What is the purpose of useMemo?", options: ["To memoize a calculated value", "To navigate between pages", "To update the DOM directly", "To create a context"], answer: "To memoize a calculated value" },
    { id: 14, question: "What is the purpose of useCallback?", options: ["To memoize a function", "To create an HTML element", "To store an image", "To fetch CSS files"], answer: "To memoize a function" },
    { id: 15, question: "What is a custom Hook?", options: ["A reusable function that uses React Hooks", "A CSS component", "A browser extension", "A database query"], answer: "A reusable function that uses React Hooks" },
    { id: 16, question: "What naming convention should custom Hooks follow?", options: ["start with get", "start with use", "start with set", "start with react"], answer: "start with use" },
    { id: 17, question: "What does useRef return?", options: ["A mutable ref object", "A string", "A CSS file", "An array of components"], answer: "A mutable ref object" },
    { id: 18, question: "Does changing a ref's current value trigger a re-render?", options: ["Yes, always", "No, not by itself", "Only in development", "Only with useEffect"], answer: "No, not by itself" },
    { id: 19, question: "What is prop drilling?", options: ["Passing props through multiple component levels", "Deleting component props", "Creating CSS classes", "Using a database"], answer: "Passing props through multiple component levels" },
    { id: 20, question: "What is the purpose of a Context Provider?", options: ["To provide context values to descendant components", "To create CSS styles", "To submit a form", "To remove state"], answer: "To provide context values to descendant components" },
    { id: 21, question: "What is the initial state argument in useState?", options: ["The starting state value", "The setter function", "A component name", "A CSS property"], answer: "The starting state value" },
    { id: 22, question: "Why use a functional state update?", options: ["To calculate new state from the previous state", "To change CSS", "To create a route", "To stop rendering"], answer: "To calculate new state from the previous state" },
    { id: 23, question: "What is a common use of useEffect?", options: ["Fetching data from an API", "Writing HTML tags", "Creating CSS variables", "Declaring a JavaScript class"], answer: "Fetching data from an API" },
    { id: 24, question: "Which hook can help avoid passing a callback repeatedly to memoized children?", options: ["useCallback", "useRef", "useContext", "useReducer"], answer: "useCallback" },
    { id: 25, question: "What is state in React?", options: ["Data that a component can manage and update", "A CSS selector", "A browser setting", "An HTML attribute"], answer: "Data that a component can manage and update" },
  ],
};

// Save a summary of the examination in history.
function saveExamResult(exam, score, totalQuestions) {
  try {
    const previousResults = JSON.parse(
      localStorage.getItem("examHistory") || "[]"
    );

    const safeResults = Array.isArray(previousResults)
      ? previousResults
      : [];

    const timestamp = Date.now();

    const newResult = {
      id: timestamp,
      timestamp,
      examTitle: exam.title,
      subject: exam.subject,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      status:
        (score / totalQuestions) * 100 >= 50
          ? "Passed"
          : "Needs Improvement",
      date: new Date(timestamp).toLocaleDateString(),
    };

    localStorage.setItem(
      "examHistory",
      JSON.stringify([...safeResults, newResult])
    );
  } catch (error) {
    console.error("Unable to save exam result:", error);
  }
}

// Create a separate storage key for each examination.
function getExamProgressKey(exam) {
  return exam?.title
    ? `examProgress_${encodeURIComponent(exam.title)}`
    : null;
}

// Load previously saved progress for an examination.
function loadExamProgress(exam, totalQuestions) {
  const key = getExamProgressKey(exam);

  if (!key) return null;

  try {
    const savedProgress = JSON.parse(localStorage.getItem(key));

    if (!savedProgress || typeof savedProgress !== "object") {
      return null;
    }

    const answers =
      savedProgress.answers &&
      typeof savedProgress.answers === "object" &&
      !Array.isArray(savedProgress.answers)
        ? savedProgress.answers
        : {};

    const markedForReview = Array.isArray(savedProgress.markedForReview)
      ? savedProgress.markedForReview.filter(
          (index) =>
            Number.isInteger(index) &&
            index >= 0 &&
            index < totalQuestions
        )
      : [];

    return {
      answers,
      currentQuestion: Math.min(
        Math.max(savedProgress.currentQuestion || 0, 0),
        Math.max(totalQuestions - 1, 0)
      ),
      timeLeft:
        Number.isFinite(savedProgress.timeLeft) && savedProgress.timeLeft > 0
          ? savedProgress.timeLeft
          : null,
      markedForReview,
    };
  } catch (error) {
    console.error("Unable to load exam progress:", error);
    return null;
  }
}

function TakeExam() {
  const navigate = useNavigate();
  const location = useLocation();

  const exam = location.state?.exam;
  const hasSubmitted = useRef(false);
  const timerRef = useRef(null);

  const examTitle = exam?.title;

  const questions = useMemo(
    () => (examTitle ? questionBank[examTitle] || [] : []),
    [examTitle]
  );
  const savedProgress = useMemo(
    () => loadExamProgress(exam, questions.length),
    [exam, questions.length]
  );
  const [currentQuestion, setCurrentQuestion] = useState(
    () => savedProgress?.currentQuestion ?? 0
  );
  const [markedForReview, setMarkedForReview] = useState(
    () => savedProgress?.markedForReview ?? []
  );
  const [answers, setAnswers] = useState(
    () => savedProgress?.answers ?? {}
  );
  const [timeLeft, setTimeLeft] = useState(
    () =>
      savedProgress?.timeLeft ??
      (Number.parseInt(exam?.duration, 10) || 30) * 60
  );

  // Submit the examination and save its result.
  const finishExam = useCallback(() => {
    if (hasSubmitted.current || !exam || questions.length === 0) {
      return;
    }

    hasSubmitted.current = true;

    try {
      const progressKey = getExamProgressKey(exam);

      if (progressKey) {
        localStorage.removeItem(progressKey);
      }
    } catch (error) {
      console.error("Unable to clear exam progress:", error);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const score = questions.filter(
      (question, index) => answers[index] === question.answer
    ).length;

    const completedResult = {
      exam,
      score,
      totalQuestions: questions.length,
      answers,
      questions,
    };

    saveExamResult(exam, score, questions.length);

    try {
      localStorage.setItem(
        "examLatestResult",
        JSON.stringify(completedResult)
      );
    } catch (error) {
      console.error("Unable to save detailed exam result:", error);
    }

    navigate("/results", {
      state: completedResult,
    });
  }, [answers, exam, navigate, questions]);

  // Start the countdown timer.
  // Answer changes do not restart this interval.
  useEffect(() => {
    if (!exam || hasSubmitted.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [exam]);

  // Automatically submit when the timer reaches zero.
useEffect(() => {
    if (timeLeft === 0) {
      finishExam();
    }
}, [timeLeft, finishExam]);

  // Save the current examination progress in the browser.
useEffect(() => {
  if (!exam || hasSubmitted.current || timeLeft <= 0) return;

  const progressKey = getExamProgressKey(exam);

  if (!progressKey) return;

  try {
    localStorage.setItem(
      progressKey,
      JSON.stringify({
        answers,
        currentQuestion,
        timeLeft,
        markedForReview,
      })
    );
  } catch (error) {
    console.error("Unable to save exam progress:", error);
  }
  }, [exam, answers, currentQuestion, timeLeft, markedForReview]);

  // Format seconds as MM:SS.
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const selectedAnswer = answers[currentQuestion];

  const answeredCount = questions.filter(
    (_, index) => answers[index] !== undefined
  ).length;

  const unansweredCount = questions.length - answeredCount;

  // Save the selected answer for the current question.
  const handleAnswer = (option) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion]: option,
    }));
  };
  const handleMarkForReview = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((index) => index !== currentQuestion)
        : [...prev, currentQuestion]
    );
  };

  // Check the user's submission preference.
  const handleSubmit = () => {
    if (hasSubmitted.current) return;

    let savedSettings = {};

    try {
      const parsedSettings = JSON.parse(
        localStorage.getItem("examSettings") || "{}"
      );

      if (
        parsedSettings &&
        typeof parsedSettings === "object" &&
        !Array.isArray(parsedSettings)
      ) {
        savedSettings = parsedSettings;
      }
    } catch (error) {
      console.error("Unable to load exam settings:", error);
    }

    if (savedSettings.confirmSubmit !== false) {
      const confirmed = window.confirm(
        `You have answered ${answeredCount} out of ${questions.length} questions. Are you sure you want to submit?`
      );

      if (!confirmed) return;
    }

    finishExam();
  };

  // Handle direct access without an exam selection.
  if (!exam || questions.length === 0) {
    return (
      <main className="p-4 sm:p-5 md:p-8 text-center">
        <div className="max-w-lg mx-auto py-10">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            No Exam Selected
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mb-5">
            Please select an examination first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/my-exams")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            Browse Exams
          </button>
        </div>
      </main>
    );
  }

  const question = questions[currentQuestion];

  return (
    <main className="w-full p-4 sm:p-5 md:p-8">
      {/* Page Heading */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
            ONLINE EXAMINATION
          </p>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white break-words">
            {exam.title}
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Answer all questions before submitting.
          </p>
        </div>

        {/* Timer */}
        <div
          className="flex items-center gap-3 bg-purple-50 dark:bg-purple-500/10 px-4 sm:px-5 py-3 rounded-xl w-fit"
          role="timer"
          aria-label={`Time remaining: ${formatTime(timeLeft)}`}
          aria-live="off"
        >
          <Clock
            className="text-purple-600 dark:text-purple-400"
            size={22}
            aria-hidden="true"
          />

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Time Remaining
            </p>

            <p
              className={`text-xl font-bold tabular-nums ${
                timeLeft <= 60
                  ? "text-red-600 dark:text-red-400"
                  : "text-purple-700 dark:text-purple-400"
              }`}
            >
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
      </header>

      {/* Exam Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Question Section */}
        <section
          aria-label="Examination questions"
          className="min-w-0 lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span className="text-xs bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 px-3 py-2 rounded-full shrink-0">
              1 Mark
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mb-7 sm:mb-8"
            role="progressbar"
            aria-label="Question progress"
            aria-valuemin={1}
            aria-valuemax={questions.length}
            aria-valuenow={currentQuestion + 1}
            aria-valuetext={`Question ${currentQuestion + 1} of ${questions.length}`}
          >
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question and Options */}
          <fieldset>
            <legend className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-7">
              {question.question}
            </legend>

            <div className="space-y-3 sm:space-y-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;

                return (
                  <label
                    key={option}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border text-left cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900 ${
                      isSelected
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300"
                        : "border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option}
                      checked={isSelected}
                      onChange={() => handleAnswer(option)}
                      className="sr-only peer"
                      aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
                    />

                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                      aria-hidden="true"
                    >
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="font-medium text-sm sm:text-base break-words min-w-0">
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

        {/* Navigation Buttons */}
          {/* Mark for Review */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleMarkForReview}
              aria-pressed={markedForReview.includes(currentQuestion)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
              markedForReview.includes(currentQuestion)
              ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400"
              : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            >
              {markedForReview.includes(currentQuestion)
              ? "Remove Review Mark"
              : "Mark for Review"}
            </button>
          </div>
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8 sm:mt-10">
            <button
              type="button"
              onClick={() =>
                setCurrentQuestion((previous) => previous - 1)
              }
              disabled={currentQuestion === 0}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <ChevronLeft size={18} aria-hidden="true" />
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentQuestion((previous) => previous + 1)
                }
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                Next
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                Submit Exam
                <Send size={17} aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        {/* Question Navigator */}
        <aside className="min-w-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-6 h-fit">
          <h2 className="font-bold text-slate-800 dark:text-white mb-2">
            Question Navigator
          </h2>

          <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
            Select a question to navigate.
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
            Answered: <strong>{answeredCount}</strong> / {questions.length}
          </p>

          <div
            className="grid grid-cols-5 gap-2 sm:gap-3"
            aria-label="Choose a question"
          >
            {questions.map((item, index) => {
              const isCurrent = currentQuestion === index;
              const isAnswered = answers[index] !== undefined;
              const isMarkedForReview = markedForReview.includes(index);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentQuestion(index)}
                  aria-label={`Question ${index + 1}, ${
                    isCurrent
                      ? "current question"
                      : isMarkedForReview
                      ? "marked for review"
                      : isAnswered
                      ? "answered"
                      : "not answered"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`h-10 rounded-lg text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                    isCurrent
                      ? "bg-purple-600 text-white"
                      : isMarkedForReview
                      ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                      : isAnswered
                      ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Navigator Legend */}
          <div className="border-t border-slate-100 dark:border-slate-800 mt-7 pt-6 space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-purple-600" aria-hidden="true" />
              Current Question
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-green-500" aria-hidden="true" />
              Answered
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-amber-400" aria-hidden="true"/>
              Marked for Review
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-600" aria-hidden="true" />
              Not Answered
            </div>
          </div>

          {/* Unanswered Questions Reminder */}
          <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl p-4 mt-7 flex gap-3 items-start">
            <AlertCircle
              size={19}
              className="text-orange-500 shrink-0"
              aria-hidden="true"
            />

            <p className="text-xs text-orange-800 dark:text-orange-300">
              {unansweredCount > 0
                ? `${unansweredCount} question${unansweredCount === 1 ? " is" : "s are"} still unanswered. Review your answers before submitting.`
                : "You have answered every question. Review your answers before submitting."}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default TakeExam;
