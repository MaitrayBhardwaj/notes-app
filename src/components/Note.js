import { useState } from 'react'
import { FaPen, FaAngleRight, FaAngleDown, FaTrash, FaCheck } from 'react-icons/fa'

function Note (props) {
	const [isEditable, setIsEditable] = useState(false)
	const [isOpen, setIsOpen] = useState(props.isOpen)
	const [text, setText] = useState(props.text)

	const handleChange = (ev) => {
		setText(ev.target.value)
	}

	const toggleEdit = () => {
		if(isEditable){
			props.handleSubmit(text)
		}

		setIsEditable(prevState => !prevState)
	}

	const deleteNote = () => {
		props.handleDelete()
	}

	const toggleOpen = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<div className="note">
			<div className="note-header">
				<button onClick={toggleOpen} className="toggle-open">{ isOpen ? <FaAngleDown /> : <FaAngleRight /> }</button>
				<span className="note-title">{text.split("\n")[0]}</span>
				<button className="editBtn" onClick={toggleEdit}>{ isEditable ? <FaCheck /> : <FaPen /> }</button>
				<button className="delBtn" onClick={deleteNote}><FaTrash /></button>
			</div>
			{
				isOpen &&
				(isEditable ? 
					<textarea className="note-text" 
						value={text}
						onChange={handleChange}
						onFocusOut={toggleEdit} /> :
					<div className="note-text" onDoubleClick={toggleEdit}>{text}</div>)
			}
		</div>
	)
}

export default Note