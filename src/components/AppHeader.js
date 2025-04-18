class AppHeader extends HTMLElement {
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
        header {
          background: linear-gradient(to right, #2d2b30, #a453f0);
          color: white;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .logo img {
          width: 32px;
          height: 32px;
          margin-right: 1rem;
        }

        nav {
          display: flex;
          gap: 1rem;
        }

        nav a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 1.25rem;
        }

        nav a:hover {
          color: #3498db;
        }

        .social {
          display: flex;
          align-items: center;
        }

        .social a {
          color: white;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .social a:hover {
          color: #3498db;
        }

        .social img {
          width: 32px;
          height: 32px;
          margin-right: 1rem;
        }
      </style>
      <header>
        <div class="logo">
          <img src=/assets/images/notes.png" alt="Notes Icon">
          <h1>Notes App</h1>
        </div>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div class="social">
          <a href="https://github.com/Fatlem" target="_blank">
            <img src="/assets/images/github.png" alt="GitHub Icon">
          </a>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
