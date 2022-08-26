# Installation and execution instructions
```
npm install
npm start

navigate to http://localhost:3000/ to see the demo page
```

# Component usage
The component supports typing, copy paste, mouse events, keyboard arrows, I tried to copy the usual behavior of selectors and autocompletion tools.

## To show the suggestions
- Try typing to see the filtered results
- Paste text in the input box
- Use **Arrow Up** and **Arrow Down** to show the popup

## To hide the suggestions
- You can delete the content of the text box
- Go to the top of the suggestions list and hit **Arrow Up** one more time
- Hit **Escape** to hide it directly

## To select a suggestion
- You can navigate the list and hit **Enter**
- Use the mouse to find and **Click** the result that you want to fill

## Navigating through suggestions
- Use **Arrow Up** and **Arrow Down**, the highlighted elements should be visible at all times

### Notes:
I used [HP-API](https://hp-api.herokuapp.com/) (props to the author) to load the data, a sample json file has been downloaded and it should be working even though there's no internet connection, but by default it performs the ajax request to hp-api.