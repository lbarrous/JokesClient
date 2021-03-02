const loadingDiv = document.getElementById("loading");

class Spinner {
  constructor() {
    loadingDiv.addEventListener("click", () => {
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

