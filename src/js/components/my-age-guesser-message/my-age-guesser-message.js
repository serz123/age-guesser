/**
 * The my-age-guesser-message web component module.
 *
 * @author Vanja Maric <vm222hx@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style> 
#container {
  height: fit-content;
}

p {
  margin-bottom: 30px;
  margin-top: 0px;
}
</style>
<div id="container">
<p id=message></p>
</div>
`

customElements.define('my-age-guesser-message',
  /**
   * Represents a my-age-guesser-message element.
   */
  class extends HTMLElement {
    /**
     * The div element.
     * Container for the message.
     *
     * @type {HTMLDivElement}
     */
    #container

    /**
     * The entered name.
     */
    #name

    /**
     * The p element.
     * Message.
     *
     * @type {HTMLElement}
     */
    #message

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
      this.#message = this.shadowRoot.querySelector('#message')
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['name']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'name' && oldValue !== newValue) {
        this.#name = newValue
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#makeMessage()
    }

    /**
     * Fetches age prediction and
     * makes message to user with predicted age.
     */
    async #makeMessage () {
      try {
        const response = await fetch(`https://api.agify.io?name=${this.#name}`)
        if (!response.ok) {
          // Handle non-successful HTTP responses (e.g., status code other than 200)
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        this.#message.innerText = `Hello ${this.#name}! I think that your age is ${data.age}!`
      } catch (error) {
        this.#message.innerText = 'Sorry, we couldn\'t retrieve the age data at the moment. Please try again later.'
      }
    }
  }
)
