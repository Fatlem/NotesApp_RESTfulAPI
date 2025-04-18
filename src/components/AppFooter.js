class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: linear-gradient(to right, #2d2b30, #a453f0);
          color: white;
          padding: 1rem;
          text-align: center;
          font-size: 0.9rem;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
          margin-top: 2rem;
        }
        footer a {
          color: #a8c7ff;
          text-decoration: none;
        }
        footer a:hover {
          text-decoration: underline;
        }
      </style>
      <footer>
        &copy; ${new Date().getFullYear()} Fatlem | 
        <a href="https://github.com/Fatlem/Notes-App" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
