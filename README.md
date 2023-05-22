# Autocomplete

This is a JavaScript class that provides autocomplete functionality for a given input field. It creates a dropdown menu that shows suggestions based on the user's input, and allows them to select one of the suggested items. The class can be configured with various options, such as the list of items to search through, the API endpoint to fetch data from, and the HTML classes to apply to the dropdown elements.

## Usage

This creates a new Autocomplete instance with the following options:

- **inputId**: the ID of the input field to attach the autocomplete functionality to
- **items(optional)**: the array of objects to search through (in this case, api not exist)
- **autoCompleteContainer**: the ID of the container element to append the autocomplete dropdown to
- **autoCompleteId**: the ID to use for the autocomplete dropdown element
- **autoCompleteClasses**: an array of CSS classes to apply to the autocomplete dropdown element
- **autoCompleteItemClasses**: an array of CSS classes to apply to each item in the autocomplete dropdown
- **nameDivClasses**: an array of CSS classes to apply to the name (text) element of each item in the dropdown
- **itemNotFoundClasses**: an array of CSS classes to apply to the "no matches found" message in the dropdown
- **autoCompleteFor**: a string identifier that determines where to show the autocomplete dropdown (in this case, the "hero-section" of the page)
- **api**: an optional API endpoint to fetch data from

Once you've instantiated the Autocomplete object, it will automatically attach event listeners to the input field and create the autocomplete dropdown as needed. The class provides several helper methods to create and manipulate the dropdown elements:

- **create(items, inputValue)**: creates the dropdown menu and populates it with matching items based on the current input value
- **autoCompleteItem(item, inputValue)**: creates an individual item in the dropdown, with highlighting for the matched text
- **createTitle(autocompleteDropdown)**: creates a title element for the dropdown (only used in the "hero-section" of the page)
- **createNotFoundItem()**: creates a "no matches found" message to display when there are no matching items
- **removeAll(autocompleteDropdown)**: removes all items from the dropdown
- **removeDropdown()**: removes the autocomplete dropdown from the DOM
- **fetchItems()**: retrieves data from an API or datalist and creates a dropdown menu based on the user's input value.
- **debounce**: returns a new function that can be called multiple times but will only execute the original func once the specified time interval has passed since the last call.

To properly utilize the autocomplete, it is only necessary to provide the API and modify the "fetchItems" method accordingly.
