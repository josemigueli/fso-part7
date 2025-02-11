import { useField, useResource } from './hooks'
import './css/index.css'

const App = () => {
  const [content, resetContent] = useField('text')
  const [name, resetName] = useField('text')
  const [number, resetNumber] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    resetContent()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    resetName()
    resetNumber()
  }

  return (
    <div>
      <div className='header-container'>
        <h1>Diary</h1>
      </div>

      <div className='notes-container'>
        <div className='notes-title'>
          <h2>Notes</h2>
        </div>

        <div className='form-container'>
          <form onSubmit={handleNoteSubmit}>
            <div>
              <textarea {...content} placeholder='Write a note' rows={6} />
            </div>
            <button>Create note</button>
          </form>
        </div>

        <div className='note-item-container'>
          {notes.map((n) => (
            <div key={n.id} className='note-item'>
              <p>{n.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='persons-container'>
        <div className='persons-title'>
          <h2>Persons</h2>
        </div>
        <div className='persons-form-container'>
          <form onSubmit={handlePersonSubmit}>
            <div className='input-container'>
              <label htmlFor='name'>Name</label>
              <input {...name} id='name' placeholder='Contact name' />
            </div>
            <div className='input-container'>
              <label htmlFor='number'>Number</label>
              <input {...number} id='number' placeholder='Contact number' />
            </div>
            <button>Add contact</button>
          </form>
        </div>

        <div className='person-item-container'>
          {persons.map((n) => (
            <div key={n.id} className='person-item'>
              <div>
                <p>{n.name}</p>
              </div>
              <div>
                <p>{n.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
