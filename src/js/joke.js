import spinner from "./spinner";
import request from "./request";
import "regenerator-runtime/runtime";
import "./notifications";
import Dismissible from "./notifications";

const cardsContainer = document.getElementById("cards-container");
const errorNotification = document.getElementById("error-notification");

export default class Joke {
  constructor(type, setup, punchline) {
    this.type = type;
    this.setup = setup;
    this.punchline = punchline;
    this.numberOfClicks = 0;
  }

  changeJoke(newJoke) {
    this.numberOfClicks = 0;
    document.getElementById("setup").innerHTML = newJoke.setup;
    document.getElementById("punchline").innerHTML = newJoke.punchline;
  }

  resetJoke() {
    this.numberOfClicks = 0;
    document.getElementById("setup").innerHTML = this.setup;
    document.getElementById("punchline").innerHTML = this.punchline;
  }

  async fetchNewJoke() {
    this.numberOfClicks = 0;
    spinner.showSpinner();
    try {
      const newJoke = await request.get("hola");
      this.changeJoke(newJoke);
      spinner.hideSpinner();
    } catch (error) {
        this.changeJoke({
            setup: "EEEE",
            punchline:"AAAA"
        });
      this.setNotificationError();
      this.flipJoke();
      spinner.hideSpinner();
    }
  }

  flipJoke() {
    this.card.classList.toggle("flip");
  }

  handleFlip() {
    this.numberOfClicks++;
    this.numberOfClicks >= 2 ? this.fetchNewJoke() : this.flipJoke();
  }

  setNotificationError() {
    const dismissible = new Dismissible(
      document.querySelector("#notifications-container")
    );
    dismissible.error("Oops! Something went wrong. Try again later");
  }

  createJokeWrapper() {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.classList.add("active");

    this.card.innerHTML = `
        <div class="inner-card">
              <div class="inner-card-front">
                <p id="setup" >${this.setup}</p>
              </div>
              <div class="inner-card-back">
                <p id="punchline" >${this.punchline}</p>
              </div>
            </div>`;

    this.card.addEventListener("click", () => {
      this.handleFlip();
    });
    cardsContainer.appendChild(this.card);
  }
}
