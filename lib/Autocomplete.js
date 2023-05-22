class Autocomplete {
  currentPage = 1;
  pageSize = 15;
  totalItems = 100;
  throttleTimer;
  constructor(
    inputId,
    items = [],
    autoCompleteContainer,
    autoCompleteId,
    autoCompleteClasses,
    autoCompleteItemClasses,
    nameDivClasses,
    itemNotFoundClasses,
    autoCompleteFor,
    api = "",
    scrollThreshold = 100
  ) {
    this.items = items;

    this.input = document.getElementById(inputId);
    this.input.setAttribute("autocomplete", "off");
    this.autoCompleteContainer = autoCompleteContainer;
    this.autoCompleteId = autoCompleteId;
    this.autoCompleteClasses = autoCompleteClasses;
    this.autoCompleteItemClasses = autoCompleteItemClasses;
    this.itemNotFoundClasses = itemNotFoundClasses;
    this.nameDivClasses = nameDivClasses;
    this.autoCompleteFor = autoCompleteFor;
    this.api = api;
    this.scrollThreshold = scrollThreshold;

    this.input.addEventListener("input", (e) => {
      this.debounceFetchedItem(e.target.value);
    });
    this.debounceFetchedItem = this.debounce(this.fetchItems, 300);

    this.input.addEventListener("focusout", () => {
      const autocompleteDropdown = document.querySelector(
        `#${this.autoCompleteId}`
      );
      toggleOnClickEvent(window, (e) => {
        if (
          autocompleteDropdown &&
          !autocompleteDropdown.contains(e.target) &&
          e.target !== autocompleteDropdown
        ) {
          autocompleteDropdown.remove();
          this.input.value = "";
        }
      });
    });
  }

  create(items) {
    const { value } = this.input;
    let autocompleteDropdown = this.createDropDown();

    if (autocompleteDropdown) {
      this.removeAll(autocompleteDropdown);
    }

    const ul = document.createElement("ul");

    if (!items.length) {
      const li = this.createNotFoundItem();
      ul.appendChild(li);
      autocompleteDropdown.appendChild(ul);
      return null;
    }

    for (let i = 0; i < items.length; i++) {
      const li = this.autoCompleteItem(items[i], value);
      ul.appendChild(li);
    }

    if (this.autoCompleteFor === "hero-section") {
      this.createTitle(autocompleteDropdown);
    }
    autocompleteDropdown.appendChild(ul);
    const loader = document.createElement("div");

    loader.setAttribute("id", "autocomplete-loader");

    autocompleteDropdown.appendChild(loader);
  }
  autoCompleteItem(item, inputValue) {
    const li = document.createElement("li");

    li.classList.add(...this.autoCompleteItemClasses);

    const nameDiv = document.createElement("div");

    nameDiv.classList.add(...this.nameDivClasses);
    nameDiv.innerHTML =
      "<span class='text-lavender-indigo'>" +
      item.name.substr(0, inputValue.length) +
      "</span>";
    nameDiv.innerHTML += item.name.substr(inputValue.length);
    li.appendChild(nameDiv);
    if (this.autoCompleteFor === "hero-section") {
      const filterDiv = document.createElement("div");
      filterDiv.classList.add("col-4", "text-onyx", "fw-light");
      filterDiv.textContent = item.filter;
      li.appendChild(filterDiv);

      const companyDiv = document.createElement("div");
      companyDiv.classList.add("col-4", "text-onyx", "fw-light");

      companyDiv.textContent = item.company;
      li.appendChild(companyDiv);
    }
    toggleOnClickEvent(li, function (event) {
      event.stopPropagation();
      event.preventDefault();
      alert("Item clicked!");
    });

    return li;
  }
  createTitle(autocompleteDropdown) {
    const productTitle = document.createElement("div");
    productTitle.classList.add("text-onyx", "fs-6", "fw-light", "px-4", "mb-2");
    productTitle.textContent = "Popular products";
    autocompleteDropdown.appendChild(productTitle);
  }

  removeAll(autocompleteDropdown) {
    const li = autocompleteDropdown.querySelectorAll("ul li");
    if (li.length) {
      for (let i = 0; i < li.length; i++) {
        const oldLi = li[i];
        const newLi = oldLi.cloneNode(true);
        oldLi.parentNode.replaceChild(newLi, oldLi);
      }
    }
    while (autocompleteDropdown.firstChild) {
      autocompleteDropdown.removeChild(autocompleteDropdown.firstChild);
    }
  }

  removeDropdown() {
    const element = document.getElementById(this.autoCompleteId);
    if (element) {
      element.parentNode.removeChild(element);
    }
    return;
  }

  createNotFoundItem() {
    const li = document.createElement("li");
    li.classList.add(...this.autoCompleteItemClasses);
    const nameDiv = document.createElement("div");
    nameDiv.classList.add(...this.itemNotFoundClasses);
    nameDiv.textContent = "No matches found";
    li.appendChild(nameDiv);
    return li;
  }

  createDropDown() {
    let autocompleteDropdown = document.querySelector(
      `#${this.autoCompleteId}`
    );
    if (!autocompleteDropdown) {
      const autocompleteContainer = document.querySelector(
        `#${this.autoCompleteContainer}`
      );
      autocompleteDropdown = document.createElement("div");

      autocompleteDropdown.classList.add(...this.autoCompleteClasses);
      autocompleteDropdown.setAttribute("id", this.autoCompleteId);
      autocompleteContainer.appendChild(autocompleteDropdown);
    }
    autocompleteDropdown.addEventListener(
      "scroll",
      function (e) {
        this.handleScroll(e);
      }.bind(this)
    );
    return autocompleteDropdown;
  }

  async fetchItems(inputValue) {
    this.currentPage = 1;
    if (inputValue.length == 0) {
      this.removeDropdown();
      return;
    }
    this.removeDropdown();
    try {
      if (this.api.length) {
        const skip = (this.currentPage - 1) * this.pageSize;
        const response = await fetch(
          `${this.api}?limit=${this.pageSize}&skip${skip}`
        );

        const items = await response.json();
        this.totalItems = items.total;
        const itemsFormatted = items.products.map((item) => {
          return {
            name: item.title,
          };
        });

        this.create(itemsFormatted);
        this.checkItemsHeight();
      } else {
        const filteredItems = this.items.filter(
          (item) =>
            item.name.substr(0, this.input.value.length).toLowerCase() ==
            this.input.value.toLowerCase()
        );

        this.totalItems = filteredItems.length;
        this.currentPage = 1;
        const startRange = (this.currentPage - 1) * this.pageSize;
        const endRange = this.currentPage * this.pageSize;
        const itemsToAppend = filteredItems.slice(startRange, endRange);
        this.create(itemsToAppend, inputValue);
        this.checkItemsHeight();
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  debounce(func, wait) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  removeInfiniteScroll = () => {
    const loader = document.getElementById("autocomplete-loader");
    if (loader) {
      loader.remove();
    }
    window.removeEventListener("scroll", this.handleScroll);
  };
  async fetchMoreItems() {
    try {
      const pageCount = Math.ceil(this.totalItems / this.pageSize);

      if (pageCount > this.currentPage) {
        if (this.api.length) {
          const skip = (this.currentPage - 1) * this.pageSize;
          const response = await fetch(
            `${this.api}?limit=${this.pageSize}&skip${skip}`
          );

          const items = await response.json();
          this.currentPage++;
          this.totalItems = items.total;
          const itemsFormatted = items.products.map((item) => {
            return {
              name: item.title,
            };
          });

          this.appendItemsOnScroll(itemsFormatted);
        } else {
          const { value } = this.input;
          const startRange = (this.currentPage - 1) * this.pageSize;
          const endRange = this.currentPage * this.pageSize;
          const filtered = this.items.filter(
            (item) =>
              item.name.substr(0, value.length).toLowerCase() ==
              value.toLowerCase()
          );

          const itemsToAppend = filtered.slice(startRange, endRange);
          this.currentPage++;
          this.appendItemsOnScroll(itemsToAppend);
        }
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  appendItemsOnScroll(items) {
    const { value } = this.input;
    const dropDown = document.getElementById(this.autoCompleteId);
    if (dropDown) {
      const ul = dropDown.getElementsByTagName("ul")[0];
      for (let i = 0; i < items.length; i++) {
        const li = this.autoCompleteItem(items[i], value);
        ul.appendChild(li);
      }
    }
  }

  throttle(callback, time) {
    if (this.throttleTimer) return;

    this.throttleTimer = true;

    setTimeout(() => {
      callback();
      this.throttleTimer = false;
    }, time);
  }
  handleScroll(e) {
    this.throttle(() => {
      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      const distanceToBottom = scrollTop + offsetHeight >= scrollHeight;
      if (distanceToBottom) {
        this.fetchMoreItems();
      }
      const pageCount = Math.ceil(this.totalItems / this.pageSize);
      if (this.currentPage === pageCount) {
        this.removeInfiniteScroll();
      }
    }, 1000);
  }

  checkItemsHeight() {
    const autocompleteDropdown = document.getElementById(this.autoCompleteId);
    const items = autocompleteDropdown.querySelectorAll("li");
    const itemHeight = items[0].offsetHeight;
    const numItemsToDisplay = Math.min(this.pageSize, items.length);
    const dropdownHeight = numItemsToDisplay * itemHeight;
    if (dropdownHeight < autocompleteDropdown.offsetHeight) {
      this.removeInfiniteScroll();
    }
  }
}
