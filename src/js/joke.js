import spinner from "./spinner";
import request from "./request";
import "regenerator-runtime/runtime";
import "./notifications";
import Dismissible from "./notifications";
import { SERVER_URL } from "./constants";

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
    this.type = newJoke.type;
    this.setup = newJoke.setup;
    this.punchline = newJoke.punchline;
    this.updateJokeText();
  }

  updateJokeText() {
    document.getElementById("setup").innerHTML = this.setup;
    document.getElementById("punchline").innerHTML = this.punchline;
    document.getElementById("typeFront").innerHTML = this.type;
    document.getElementById("typeBack").innerHTML = this.type;
  }

  resetJoke() {
    this.numberOfClicks = 0;
    this.updateJokeText();
  }

  fetchNewJoke(firstCall = false) {
    this.numberOfClicks = 0;
    spinner.showSpinner();
    request.get(SERVER_URL).then(newJokes => {
        this.changeJoke(newJokes.jokes);
        !firstCall && this.flipJoke();
        spinner.hideSpinner();
    }).catch(e => {
        this.setNotificationError();
        this.flipJoke();
        spinner.hideSpinner();
    });
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
        errorNotification
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
                <p id="typeFront" >${this.type}</p>
              </div>
              <div class="inner-card-back">
                <p id="punchline" >${this.punchline}</p>
                <p id="typeBack" >${this.type}</p>
              </div>
            </div>`;

    this.card.addEventListener("click", () => {
      this.handleFlip();
    });
    document.getElementById("cards-container").appendChild(this.card);
  }
}
