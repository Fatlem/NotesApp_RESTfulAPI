import { deleteNote, updateNote } from '../utils/api.js';
import Swal from 'sweetalert2';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.note = {};
  }

  connectedCallback() {
    this.note = JSON.parse(this.getAttribute('note'));
    this.render();
  }

  render() {
    const formattedBody = this.note.body
      .replace(/\n/g, '<br>')
      .replace(/ {2}/g, '&nbsp;&nbsp;');

    this.shadowRoot.innerHTML = `
      <style>
        /* Style sama seperti sebelumnya */
        .note {
          background: white;
          border-left: 4px solid #3498db;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0px 2px 6px rgba(0,0,0,.05);
          margin-bottom: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        .note:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 16px rgba(33, 33, 33, .12);
        }

        .note h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
          font-size: 1.25rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid #eee;
        }

        .note p {
          color: #34495e;
          line-height: 1.6;
          margin: 0 0 1.2rem 0;
          white-space: pre-line;
        }

        .note small {
          display: block;
          color: #7f8c8d;
          font-size: 0.85rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        button {
          cursor: pointer;
          font-size: .9rem;
          padding: .5rem .75rem;
          border: none;
          border-radius: .375rem;
          margin-right: .5rem;
        }

        button.edit-btn {
          background: #3498db;
          color: white;
        }

        button.edit-btn:hover {
          background: #2980b9;
        }

        button.delete-btn {
          background: #e74c3c;
          color: white;
        }

        button.delete-btn:hover {
          background: #c0392b;
        }
      </style>

      <div class="note">
        <h3>${this.note.title}</h3>
        <p>${formattedBody}</p>
        <small>${new Date(this.note.createdAt).toLocaleString()}</small>
        <button class="edit-btn" data-id="${this.note.id}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="delete-btn" data-id="${this.note.id}">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    `;

    this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => this.deleteNote());
    this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => this.editNote());
  }

  async deleteNote() {
    try {
      const result = await Swal.fire({
        title: 'Yakin?',
        text: 'Yakin sirr dihapus permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya hapus!',
        cancelButtonText: 'Batal'
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Menghapus...',
          text: 'Catatan sedang dihapus...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        await deleteNote(this.note.id);

        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Done Sirr!',
          showConfirmButton: false,
          timer: 1500
        });

        this.dispatchEvent(new CustomEvent('note-deleted', {
          detail: this.note.id,
          bubbles: true,
          composed: true
        }));
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error deleting note: ${error.message}`
      });
    }
  }

  editNote() {
    this.dispatchEvent(new CustomEvent('edit-note', {
      detail: this.note,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('note-item', NoteItem);
