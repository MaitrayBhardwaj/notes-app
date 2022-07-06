import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { nanoid } from 'nanoid'

import Note from './Note'

function Main() {
	 const [searchQuery, setSearchQuery] = useState('')
	const [notes, setNotes] = useState(() => {
		return JSON.parse(localStorage.getItem('notes')) || []
	})

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes))
	}, [notes])

	 const handleChange = (ev) => {
	 	setSearchQuery(ev.target.value)
	 }

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
		setNotes(prevNotes => [...prevNotes, { 
			_id: nanoid(), 
			color: '#191919', 
			text: 'New Note', 
			isOpen: true 
		}])
	}

	const changeColor = (color, _id) => {
		setNotes(prevNotes => {
			return prevNotes.map(note => {
				return _id === note._id ? { ...note, color: color } : note
			})
		})
	}

	const toggleOpen = (_id) => {
		setNotes(prevNotes => {
			return prevNotes.map(note => {
				return _id === note._id ? { ...note, isOpen: !note.isOpen } : note
			})
		})
	}

	 const handleSubmit = (ev) => {
	 	ev.preventDefault()
	 }

	const notesElements = (() => {
		const queriedNotes = notes.filter(note => note.text.includes(searchQuery))
		return queriedNotes.map(note => (
			<Note 
				text={note.text}
				key={note._id}
				color={note.color}
				isOpen={note.isOpen}
				handleSubmit={(text) => updateNote(text, note._id)}
				handleDelete={() => deleteNote(note._id)}
				toggleOpen={() => toggleOpen(note._id)}
				changeColor={(color) => changeColor(color, note._id)}
			/>
		))
	})()

	const notFound = (
		<div className="notFound">
			No notes found.
		</div>
	)

	return (
		<div className="main">
			<form className="search-form" onSubmit={handleSubmit}>
				<input 
					type="text"
					placeholder="Search Notes..."
					className="searchbar"
					onChange={handleChange}
					value={searchQuery} />
			</form>
			<button className="addNote" onClick={addNewNote}><FaPlus /></button>
			<div className="notes">
				{ notesElements.length === 0 ? notFound : notesElements }
			</div>
		</div>
	)
}

export default Main

