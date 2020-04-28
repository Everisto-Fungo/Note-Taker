"use strict"


// Read existing notes from localStorage
const getSavedNotes =  ()=> {
    const notesJSON = localStorage.getItem('notes')

    try {
        return  notesJSON !== null ? JSON.parse(notesJSON) :[]
    } catch (e) {
        return []
    }
}
// save notes to local storage
let saveLocalStorage =  notes=> {
    localStorage.setItem("notes", JSON.stringify(notes))
}
// remove note 
const removeNote =  id=> {
  const noteIndex = notes.findIndex( note =>note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex,1)
    }
}

// generate dom note
let generateDom = note => {
    let noteDiv = document.createElement("a")
    noteDiv.classList.add("list-item")
    // let deletebtn = document.createElement("p")
    const status = document.createElement("p")
        status.classList.add("list-item__subtitle")
    let noteTitle = document.createElement("p")
    noteTitle.classList.add("list-item__title")


    // deletebtn.id=note.id
    // deletebtn.textContent="X"
    // noteDiv.appendChild(deletebtn)
    // // noteTitle.href=
    // deletebtn.addEventListener("click",  () => {
    //     removeNote(note.id)
    //     renderNotes(notes, filters)
    //     saveLocalStorage(notes)

    // })
    
    if (note.title.length > 0) {
        noteTitle.textContent=note.title
    }else{
        noteTitle.textContent="Untitled"
    }

    noteDiv.appendChild(noteTitle)

    // setup the link 

    noteDiv.setAttribute("href",`edit.html#${note.id}` )

    // status message 
    status.textContent = generateLastEdited(note.updatedAt)
    noteDiv.appendChild(status)
    return noteDiv
}

// Sort your notes by one of three ways
const sortNotes =  (notes, sortBy) =>{
    if (sortBy === 'byEdited') {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    }  else if (sortBy === 'byCreated') {
        return notes.sort( (a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort( (a, b) =>{
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}


// render the generated dom notes to the dom 
const renderNotes =  (notes, filters) =>{

    notes = sortNotes(notes,filters.sortBy)

    const searchFilteredNotes = notes.filter( note => {
        return note.title.toLowerCase().includes(filters.searchText) || 
               note.body.toLowerCase().includes(filters.searchText)
    })
    notesDiv.innerHTML=""

    if (searchFilteredNotes.length >0) {
        searchFilteredNotes.forEach(note => {
            const p =generateDom(note)
            notesDiv.appendChild(p)
            });
        
    } else {
        const emptymessage = document.createElement("p")
        emptymessage.textContent= "No notes to show"
        emptymessage.classList.add("empty-message")
        notesDiv.appendChild(emptymessage)

    }
      
}

// Generate the last edited message
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

