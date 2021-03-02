import spinner from "./spinner";
import request from "./request";

const cardsContainer = document.getElementById("cards-container");

export default class Joke {
  constructor(type, setup, punchline) {
    this.type = type;
    this.setup = setup;
    this.punchline = punchline;
    this.numberOfClicks = 0;
  }

  changeJoke() {
    this.numberOfClicks = 0;
    /* this.type = newJoke.type;
    this.setup = newJoke.setup;
    this.punchline = newJoke.punchline; */
    document.getElementById("setup").innerHTML = "EEE";
    document.getElementById("punchline").innerHTML = "OOOO";
  }

  fetchNewJoke() {
    this.numberOfClicks = 0;
    spinner.showSpinner();
    this.changeJoke();
    try {
      //const newJoke = await request.get("localhost");
      this.changeJoke();
      spinner.hideSpinner();
    } catch (error) {
      console.log("error");
      spinner.hideSpinner();
    }
  }

  flipJoke(cardElement) {
    this.numberOfClicks++;
    cardElement.classList.toggle("flip");
  }

  handleFlip(cardElement) {
    this.numberOfClicks >= 1 ? this.fetchNewJoke() : this.flipJoke(cardElement);
  }

  createJokeWrapper() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("active");

    card.innerHTML = `
        <div class="inner-card">
              <div class="inner-card-front">
                <p id="setup" >${this.setup}</p>
              </div>
              <div class="inner-card-back">
                <p id="punchline" >${this.punchline}</p>
              </div>
            </div>`;

    card.addEventListener("click", () => {
      this.handleFlip(card);
    });
    cardsContainer.appendChild(card);
  }
}
