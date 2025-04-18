const API_URL = 'https://notes-api.dicoding.dev/v2';

export async function fetchNotes() {
  try {
    const response = await fetch(`${API_URL}/notes`);
    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function createNote(title, body) {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteNote(id) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete note: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateNote(id, title, body) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
