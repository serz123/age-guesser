/**
 * The my-age-guesser-app web component module.
 *
 * @author Vanja Maric <vm222hx@student.lnu.se>
 * @version 1.0.0
 */
import '../my-name-input'
import '../my-age-guesser-message'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
  #container {
    max-width: 800px;
    margin: 10% auto;
    padding: 40px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: 'Caveat', cursive;
    font-size: 22px;
  }
  
  #infoMessage {
    margin-bottom: 30px;
    margin-top: 0px;
  }

  #invalidMessage {
    margin-bottom: 0;
    margin-top: 30px;
    color: red;
  }
  
  button {
    vertical-align: middle;
    background-color: #007bff;
    color: #fff;
    border: 1px solid #ccc;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  <div id="container">
  <p id="infoMessage">Enter your name and see how old do I think that you are!</p>
  <my-name-input id="nameInput"></my-name-input>
  </div>
`

customElements.define('my-age-guesser-app',
  /**
   * Represents a my-age-guesser-app element.
   */
  class extends HTMLElement {
    /**
     * The div element.
     * Container for the application.
     *
     * @type {HTMLDivElement}
     */
    #container

    /**
     * Message to user.
     */
    #messageContainer

    /**
     * Name input form.
     */
    #nameInput

    /**
     * The p element.
     * Gives info message to the user.
     *
     * @type {HTMLElement}
     */
    #infoMessage

    /**
     * Restart button.
     *
     * @type {HTMLButtonElement}
     */
    #restartButton

    /**
     * Html p element.
     *
     * @type {HTMLElement}
     */
    #invalidNameMessage

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#container = this.shadowRoot.querySelector('#container')
      this.#messageContainer = this.shadowRoot.querySelector('#messageContainer')
      this.#nameInput = this.shadowRoot.querySelector('#nameInput')
      this.#infoMessage = this.shadowRoot.getElementById('infoMessage')
      this.#container.addEventListener('submited', (event) => this.#showPredictionMessage(event.detail))
    }

    /**
     * Shows Hello mesage and age prediction.
     *
     * @param {string} name - Name etered by the user.
     */
    #showPredictionMessage (name) {
      // If name is invalid
      if (name === -1) {
        this.#invalidNameMessage = document.createElement('p')
        this.#invalidNameMessage.setAttribute('id', 'invalidMessage')
        this.#invalidNameMessage.innerText = 'Please enter a valid name.'
        this.#container.appendChild(this.#invalidNameMessage)
      } else {
        // Remove input, button and messages.
        if (this.#invalidNameMessage) {
          this.#container.removeChild(this.#invalidNameMessage)
        }
        this.#container.removeChild(this.#nameInput)
        this.#container.removeChild(this.#infoMessage)
        // Create prediction message and restart button.
        this.#messageContainer = document.createElement('my-age-guesser-message')
        this.#messageContainer.setAttribute('name', name)
        this.#container.appendChild(this.#messageContainer)
        this.#restartButton = document.createElement('button')
        this.#restartButton.setAttribute('type', 'button')
        this.#restartButton.innerText = 'Try again'
        this.#container.appendChild(this.#restartButton)
        this.#restartButton.addEventListener('click', () => this.#restartApp())
      }
    }

    /**
     * Restarts app.
     */
    #restartApp () {
      this.#container.removeChild(this.#restartButton
      )
      this.#container.removeChild(this.#messageContainer)
      this.#container.appendChild(this.#infoMessage)
      this.#container.appendChild(this.#nameInput)
    }
  }
)
