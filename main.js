let notes = undefined

const loadNotes = () => {
  const notesdiv = document.getElementById("#notes");
	const storedNotes = localStorage.getItem("notes")
  notes = storedNotes ? JSON.parse(storedNotes) : [];

  if (notes.length == 0) {
    notesdiv.innerHTML = `<p>No notes found</p>`;
  } else {
    notesdiv.innerHTML = `<ul class="list">${notes.map(
      (note) => `<li class="note-preview">
				<h2>${note.name || "Untitled Note"}</h2>
				<p>${note.date}</p>
				<p class="truncate">${note.content || "No content yet"}</p> 
				<div>
					<a href="/note.html?id=${note.id}"><button>Open Note</button></a>
					<button>Delete Note</button> 
				</div>
				</li>`
    ).join("")}</ul>`;
  }
};

const newNote = () => {
  const newNoteBtn = document.getElementById("#newnote");
	newNoteBtn.disabled = true
	newNoteBtn.innerHTML = "Creating Note..."
	const id = crypto.randomUUID()

	notes.push({name: "", content: "", date: new Date(), id})
	localStorage.setItem("notes", JSON.stringify(notes))

	const url = new URL(window.location.href)
	url.pathname = `/note.html`
	url.searchParams.set("id", id)
	window.location.assign(url.href)
}



