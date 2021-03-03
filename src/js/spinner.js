class Spinner {
  constructor() {
    document.getElementById("loading").addEventListener("click", () => {
      this.hideSpinner();
    });
  }

  showSpinner() {
    document.getElementById("loading").style.visibility = "visible";
  }

  hideSpinner() {
    document.getElementById("loading").style.visibility = "hidden";
  }
}

export default new Spinner();

