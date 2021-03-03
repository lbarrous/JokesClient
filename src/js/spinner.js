class Spinner {
  constructor() {
    document.getElementById("loading").addEventListener("click", () => {
      this.hideSpinner();
    });
  }

  showSpinner() {
    loadingDiv.style.visibility = "visible";
  }

  hideSpinner() {
    loadingDiv.style.visibility = "hidden";
  }
}

export default new Spinner();

