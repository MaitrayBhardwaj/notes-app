import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { nanoid } from 'nanoid'

import Note from './Note'

// const kmpSearch = (pattern, text) => {
// 	if (pattern.length === 0){
// 		return false;
// 	}
// 	let j = 0;
// 	for(let i = 0; i < text.length; i++) {
// 	    if(text.charAt(i) !== pattern.charAt(j)){
// 	    	j = 0;
// 	    }
// 	    if(text.charAt(i) === pattern.charAt(j)) {
// 	      	j++;
// 	    	if(j === pattern.length)
// 	        	return true;
// 	    }
//   	}
// 	return false;
// }

function Main() {
	// const [searchQuery, setSearchQuery] = useState('')
	const [notes, setNotes] = useState(() => {
		return JSON.parse(localStorage.getItem('notes')) || []
	})

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes))
	}, [notes])

	// const handleChange = (ev) => {
	// 	setSearchQuery(ev.target.value)
	// }

	const updateNote = (text, _id) => {
		setNotes(prevNotes => (
			prevNotes.map(note => {
				return _id === note._id ? { ...note, text: text } : note
			})
		))
	}

	const deleteNote = (_id) => {
		setNotes(prevNotes => (
			prevNotes.filter(note => _id !== note._id)
		))
	}

	const addNewNote = () => {
		setNotes(prevNotes => [...prevNotes, { _id: nanoid(), text: 'New Note', isOpen: true }])
	}

	// const handleSubmit = (ev) => {
	// 	ev.preventDefault()
	// 	setSearchQuery('')
	// }

	const notesElements = notes.map((note, idx) => (
		<Note 
			text={note.text}
			key={note._id}
			handleSubmit={(text) => updateNote(text, note._id)}
			handleDelete={() => deleteNote(note._id)} 
		/>
	))

	return (
		<div className="main">
			<button className="addNote" onClick={addNewNote}><FaPlus /></button>
			<div className="notes">
				{ notesElements }
			</div>
		</div>
	)
}

export default Main


// <form className="search-form" onSubmit={handleSubmit}>
// 	<input 
// 		type="text"
// 		placeholder="Search Notes..."
// 		className="searchbar"
// 		onChange={handleChange}
// 		value={searchQuery} />
// </form>