class Picker {
  constructor(selector, title, items, selectedItem, onChange) {
    this.onChange = onChange;
    this.selector = selector;
    this.title = title;
    this.items = items;

    this.element = document.querySelector(selector);
    this.element.addEventListener("click", this.handleClick);

    this.selectedItem = selectedItem;

    this.render();
  }

  handleClick = (e) => {
    if (e.target.dataset.value) {
      const value = e.target.dataset.value;
      if (this.selectedItem != value) {
        this.selectedItem = value;
        this.render();
        this.onChange(this.selectedItem);
      }
    }
  };

  render = () => {
    const { element, title, items, selectedItem } = this;

    element.innerHTML = `
    <h1 class="picker__title">${title}</h1>
    ${items
      .map((item) => {
        const isSelected = selectedItem == item.value ? "--picked" : "";
        return `<button class="picker__button${isSelected}" data-value="${item.value}">${item.label}</button>`;
      })
      .join("")}
    `;

    return this.innerHTML;
  };
}

export default Picker;
