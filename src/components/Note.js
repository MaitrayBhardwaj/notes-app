import { useState, useEffect } from 'react'
import { FaPen, FaAngleRight, FaAngleDown, FaTrash, FaCheck } from 'react-icons/fa'

function Note (props) {
	const [noteConfig, setNoteConfig] = useState({
		isEditable: false,
		isOpen: props.isOpen,
		text: props.text,
		color: props.color
	})

	useEffect(() => {
		setNoteConfig({
			isEditable: false,
			isOpen: props.isOpen,
			text: props.text,
			color: props.color
		})
	}, [props])

	const handleChange = (ev) => {
		setNoteConfig(prevConfig => (
			{ ...prevConfig, text: ev.target.value }
		))
	}

	const toggleEdit = () => {
		if(noteConfig.isEditable){
			props.handleSubmit(noteConfig.text)
		}

		setNoteConfig(prevConfig => (
			{ ...prevConfig, isEditable: !prevConfig.isEditable }
		))
	}

	const deleteNote = () => {
		props.handleDelete()
	}

	const toggleOpen = () => {
		props.toggleOpen()
	}

	const changeColor = (ev) => {
		setNoteConfig(prevConfig => (
			{ ...prevConfig, color: ev.target.value }
		))
		props.changeColor(ev.target.value)
	}

	return (
		<div className="note">
			<div className="note-header" style={{ backgroundColor: noteConfig.color }} >
				<button onClick={toggleOpen} className="toggle-open">
					{ noteConfig.isOpen ? <FaAngleDown /> : <FaAngleRight /> }
				</button>
				<span className="note-title">{noteConfig.text.split("\n")[0]}</span>
				<button className="editBtn" onClick={toggleEdit}>{ noteConfig.isEditable ? <FaCheck /> : <FaPen /> }</button>
				<button className="delBtn" onClick={deleteNote}><FaTrash /></button>
				<input 
					type="color"
					className="note-header-color"
					value={noteConfig.color} 
					onChange={changeColor} 
				/>
			</div>
			{
				noteConfig.isOpen &&
				(
					noteConfig.isEditable ? 
					<textarea className="note-text" 
						value={noteConfig.text}
						onChange={handleChange}
					/> :
					<div className="note-text" onDoubleClick={toggleEdit}>{noteConfig.text}</div>
				)
			}
		</div>
	)
}

export default Note