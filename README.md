TEBRICEEEE

// import "./App.css";
// Treba 2 funkcije getData koja je sinhrona i vraca 20 random brojeva vrednosti izmedju 1 i 10.
// Druga funkcija je getAsyncData koja isto vraca 20 random brojeva izmedju 1 i 10 ali kroz 2 sekunde (i treba da ide preko promis-a)
// Sada ova dva arraya is getData i getAsyncData ubaciti u state komponente i prikazati ta dva array-a kao niz paragrafa <p></p> 1 broj 1 paragraf!

Task 2: filter all unique numbers and rearange from lowest to highest (from top to bottom)

Task 3: Create a custom hook for generating random numbers with error handling

Develop a custom React hook called useRandomNumbers that generates an array of random numbers and handles errors.
The hook should accept two parameters: the length of the array (e.g., 20) and the range of random numbers (e.g., between 1 and 10).
After generating the random numbers array, calculate the median value. If the median value is less than 5, reject the promise and handle the error accordingly.
The hook should return the array of random numbers or an error message if the promise is rejected.

Task 4: Add a button to regenerate random numbers

Implement a button that, when clicked, regenerates the random numbers using the useRandomNumbers custom hook.
Update the state of the component and refresh the display accordingly after regenerating the random numbers.

Task 5: Implement search and filter functionality on the UI

Create a search input field that allows users to search for a specific number within the generated random numbers array.
Implement debouncing for the search input to improve performance. Debounce the search input so that the search function is only called after the user has stopped typing for a specified delay (e.g., 300ms). Use the useEffect and useCallback hooks to implement the debouncing functionality.
Highlight the paragraphs containing the searched number using DOM manipulation in React. Use the useRef hook to create a reference for each paragraph element, and update the corresponding paragraph's styles when the user searches for a number.
Add a filter functionality that allows users to display only the numbers that meet specific criteria, such as even numbers or numbers greater than a certain value. Implement the filter functionality using the useCallback hook, ensuring the filter function is only re-created when its dependencies change.
imas fore do nedelje
vazi se sve sto pushujes na github, uradices branch out sa main/master grane, grana nek ti se zove kako god, npr feature/kosmi123
i onda kad zavrsis uradis Pull request na to
mene dodaj kao contributora na projekat
takocemo sad da radimo review