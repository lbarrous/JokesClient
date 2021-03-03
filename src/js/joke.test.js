import Joke from "./joke";
import Dismissible from "./notifications";

jest.mock("./spinner.js", () => ({
  showSpinner: jest.fn(),
  hideSpinner: jest.fn()
}));
jest.mock("./notifications.js");
jest.mock("./request.js", () => ({
  __esModule: true,
  default: { get: () => Promise.resolve() }
}));

describe("Jokes", () => {
  let joke;
  beforeAll(() => {
    joke = new Joke("type", "setup", "punchline");
    document.getElementById = jest.fn().mockReturnValue({
      appendChild: jest.fn(),
      addEventListener: jest.fn()
    });
  });
  it("should create the joke", () => {
    joke.createJokeWrapper();
    expect(document.getElementById).toHaveBeenCalled();
  });
  it("displays notification error", () => {
    joke.setNotificationError();
    expect(Dismissible).toHaveBeenCalled();
  });
  it("should change the joke if it has been clicked twice", () => {
    joke.numberOfClicks = 2;
    joke.handleFlip();
    expect(joke.numberOfClicks).toBe(0);
  });
  it("should flip the joke if it has not been clicked twice", () => {
    joke.numberOfClicks = 0;
    joke.handleFlip();
    expect(joke.numberOfClicks).toBe(1);
  });
});
