![Lexicon Logo](https://lexicongruppen.se/media/wi5hphtd/lexicon-logo.svg)

# Workshop 2 - State, Props & Hooks

## Goal

Take the static UI from Workshop 1 and make it interactive using React state, props, and hooks.

Students should move from "rendering components" to "managing behavior" by connecting user input to the UI.

## What to Practice

* using `useState` to store UI state
* passing data and callbacks through props
* rendering collections with `.map()`
* creating controlled form inputs
* building search and filter functionality
* updating the UI in response to user actions
* using `useEffect` for simple side effects when needed

## Suggested Features

Implement a few dynamic behaviors in the shop UI, such as:

* a search field that filters products by name
* category or tag filters
* a product count that updates automatically
* conditional rendering for empty search results
* reusable product data rendered from an array instead of hardcoded markup

---

## Optional Advanced Tasks

If you finish early, try these advanced challenges to practice more complex React patterns:

### 1. Theme Management with `useContext`
Implement a theme (dark/light mode) toggle using React Context to manage the visual style across the entire application without passing props through every level.

### 2. Event/Product Management with `useReducer`
Manage complex state for products or events (adding, deleting, or updating) using a reducer instead of multiple `useState` hooks to keep your state logic organized and separate from the UI.

## Note

Keep the state structure simple. Try to place state only where it is needed, and avoid adding complexity too early.
