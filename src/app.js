import { fetchNotes } from './utils/api.js';
import './assets/css/styles.css';
import './components/AppHeader.js';
import './components/NoteItem.js';
import './components/NoteForm.js';
import './components/AppFooter.js';

const notesContainer = document.getElementById('notes-container');
const noteForm = document.querySelector('note-form');

document.addEventListener("DOMContentLoaded", () => {
  displayNotes();
});

document.addEventListener("notes-updated", () => {
  displayNotes();
});

document.addEventListener("edit-note", (event) => {
  const note = event.detail;
  noteForm.setNote(note);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("note-deleted", async (event) => {
  try {
    displayNotes();
  } catch (error) {
    console.error(error);
    alert(`Error saat menghapus catatan: ${error.message}`);
  }
});

async function displayNotes() {
  notesContainer.innerHTML = '<div class="loading">Loading notes...</div>';
  
  try {
    const notes = await fetchNotes();
    notesContainer.innerHTML = '';

    for (let note of notes) {
      const el = document.createElement("note-item");
      el.setAttribute("note", JSON.stringify(note));
      notesContainer.appendChild(el);
    }
  } catch (err) {
    notesContainer.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}
