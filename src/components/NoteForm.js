import { createNote, updateNote } from '../utils/api.js';
import Swal from 'sweetalert2';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.noteToEdit = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .input-group {
          margin-bottom: 1.5rem;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        input[type="text"]:focus,
        textarea:focus {
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
          outline:none;
        }

        button[type="submit"] {
          background:#3498db;
          color:white;
          border:none;
          padding:1rem 2rem;
          border-radius:8px; 
          cursor:pointer; 
          font-size:1rem; 
          transition : all .3s ease; 
          width :100%; 
          display:flex; 
          align-items:center; 
          justify-content:center;
        }

        button[type="submit"]:hover{
          background:#2980b9; 
          transform : translateY(-2px);
        }
      </style>
      <form id="form">
        <div class="input-group">
          <input type="text" id="title" placeholder="Judul" maxlength="100" required />
        </div>
        <div class="input-group">
          <textarea id="body" placeholder="Isi Catatan" required></textarea>
        </div>
        <button type="submit"><i class="fas fa-save"></i> Simpan Catatan</button>
      </form>  
    `;

    this.shadowRoot
      .getElementById('form')
      .addEventListener('submit', (event) => this.submitForm(event));
  }

  async submitForm(event) {
    event.preventDefault();
    const title = this.shadowRoot.getElementById('title').value.trim();
    const body = this.shadowRoot.getElementById('body').value.trim();

    try {
      Swal.fire({
        title: this.noteToEdit ? 'Memperbarui...' : 'Menyimpan...',
        text: this.noteToEdit ? 'Catatan sedang diperbarui...' : 'Catatan sedang disimpan...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.noteToEdit) {
        await updateNote(this.noteToEdit.id, title, body);
        Swal.fire({
          icon: 'success',
          title: 'Catatan Diperbarui',
          text: 'Done Sirr!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3498db',
        });
      } else {
        await createNote(title, body);
        Swal.fire({
          icon: 'success',
          title: 'Catatan Ditambahkan',
          text: 'Done Sirr!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3498db',
        });
      }

      document.dispatchEvent(new CustomEvent('notes-updated'));
      this.resetForm();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error : ${error.message}`,
        confirmButtonText: 'OK',
        confirmButtonColor: '#e74c3c',
      });
    }
  }

  resetForm() {
    this.noteToEdit = null;
    this.shadowRoot.getElementById('form').reset();
  }

  setNote(note) {
    this.noteToEdit = note;
    this.shadowRoot.getElementById('title').value = note.title;
    this.shadowRoot.getElementById('body').value = note.body;
  }
}

customElements.define('note-form', NoteForm);
