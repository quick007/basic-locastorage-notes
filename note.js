let notes = undefined;
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const storedNotes = localStorage.getItem("notes");
notes = storedNotes ? JSON.parse(storedNotes) : [];

const loadNote = () => {
  const note = notes.find((note) => note.id === id);

  const nameinput = document.getElementById("#name");
  const contentinput = document.getElementById("#content");

  nameinput.value = note.name;
  contentinput.innerHTML = note.content;
};

/**
 * Save this note
 * @param {Event | undefined} e
 */
const saveNote = (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);

  notes = notes.map((note) => {
    if (note.id === id) {
      note = {
        ...note,
        name: data.get("name"),
        content: data.get("content"),
      };
    }
    return note;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};
