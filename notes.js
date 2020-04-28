"use strict"
let notes=getSavedNotes()

let filters = {
    searchText:"",
    sortBy:"byEdited",
}
// notes div
let notesDiv =document.querySelector(".notes")

createNote.addEventListener("click",e => {

    const id= uuidv4()
    let timestamp =moment().valueOf()
    notes.push({
        id:id,
        createdAt:timestamp,
        updatedAt:timestamp,
        title:"",
        body:""
    })


    saveLocalStorage(notes)
    location.assign(`edit.html#${id}`)
    // renderNotes(notes, filters)
})

//call render the generated dom notes to the dom 
renderNotes(notes, filters)

let input = document.querySelector(".input").addEventListener("input", e => {
    filters.searchText=e.target.value

renderNotes(notes,filters)
})
let filter = document.querySelector("#filter-by").addEventListener("input", e => {
renderNotes(notes,filters)
filters.sortBy=e.target.value

})

// checking for changes in the local storage 

window.addEventListener("storage", e => {

    if (e.key==="notes") {
    notes = JSON.parse(e.newValue)
    renderNotes(notes,filters)

}
})    
console.log(notes)


