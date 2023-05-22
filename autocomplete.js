const items = [
  { name: "CON-M124PCBF" },
  { name: "CON-M125PCBF" },
  { name: "CAT-5EB-003-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
  { name: "CAT-5EB-005-BL" },
];

// Get a reference to the input element
// const input = document.querySelector("#autocomplete-search-hero-section");

const autoCompleteItemClasses = ["px-2", "py-1", "row", "autocomplete-item"];

const nameDivClasses = ["col-4", "text-raisin-black"];

const itemNotFoundClasses = ["col-12", "text-raisin-black"];
const autoCompleteFor = "hero-section";
const inputId = "autocomplete-search-hero-section";
const autoCompleteId = "autocomplete-dropdown";
const autoCompleteContainer = "autocomplete-container";

const autoCompleteClasses = [
  "autocomplete-dropdown",
  "bg-cultured",
  "w-100",
  "position-absolute",
  "bg-light",
  "rounded-1",
  "py-3",
];

// Call createList() on input change
const api = "";
new Autocomplete(
  inputId,
  items,
  autoCompleteContainer,
  autoCompleteId,
  autoCompleteClasses,
  autoCompleteItemClasses,
  nameDivClasses,
  itemNotFoundClasses,
  autoCompleteFor,
  api
);
