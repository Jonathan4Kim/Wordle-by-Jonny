# Wordle-by-Jonny

This project was a Wordle Clone designed to get a better understanding of React, in particular:
1. Immutability
2. Parent-Child Components and the passing of values, objects, and functions
3. State Handling via useEffect and UseState
4. Passing information to an API and interacting with the API
5. Event Handling
6. React Animation

## What I learned

1. Immutability during updates is essential during useState functionality.
   1. I had so many errors with cases not being properly updated
2. You can pass information from parents to children
   1. Before, this was not something that I really knew about, and it was interesting to see how it was put into use. But being able to pass in functions that can update the parent's useState was something that I valued deeply.
3. Even a simple game like Wordle has its unique intricacies during implementation
   1. Using priority to update the key colors appropriately was not something I considered
   2. Nor was the case 
   3. I wouldn't say that these issues were difficult to implement, but it was interesting to see the edge cases in things like this
4. forEach does NOT create a copy. It iterates against the original array, making this terrible for useState.  Ideal to use .map or .reduce instead.  Something I figured out way too late.
5. JSX is incredibly unique and I can see how convenient it is in comparison to Vanilla JS.
6. How to flash quick messages using setTimeout and a quick useState Boolean
7. how to implement Wordle (Wowwww, really?)
8. setters for useState update asynchronously and slowly.
