import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { useField } from './hooks'
import './css/index.css'

const Menu = () => {
  return (
    <div className='header-container'>
      <div>
        <h1>Software Anecdotes</h1>
      </div>
      <div>
        <Link to='/' className='header-link'>
          Anecdotes
        </Link>
        <Link to='/create' className='header-link'>
          New Anecdote
        </Link>
        <Link to='/about' className='header-link'>
          About
        </Link>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>

    {anecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <Link to={`/anecdote/${anecdote.id}`} className='card-link'>
          <div className='anecdote-list-item'>{anecdote.content}</div>
        </Link>
      </div>
    ))}
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div className='anecdote-container'>
    <div className='individual-anecdote'>
      <h2>{anecdote.content}</h2>
      <h3>by {anecdote.author}</h3>
      <div className='votes-info-container'>
        <p>Has {anecdote.votes} votes</p>
        <p>
          For more info see <a href={anecdote.info}>{anecdote.info}</a>{' '}
        </p>
      </div>
    </div>
  </div>
)

const About = () => (
  <div>
    <h2>About Anecdotes</h2>

    <div className='about-card'>
      <p>According to Wikipedia:</p>
      <em>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </em>
    </div>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div className='footer-container'>
    <p>
      Anecdote app for
      <a href='https://fullstackopen.com/'> Full Stack Open</a>.
    </p>
    <p>
      See the the source code{' '}
      <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
        here
      </a>
      .
    </p>
  </div>
)

const CreateNew = (props) => {
  const [content, resetContent] = useField('content')
  const [author, resetAuthor] = useField('author')
  const [info, resetInfo] = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const resetFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>New Anecdote</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label htmlFor='content'>Content</label>
            <input {...content} placeholder='Anecdote content' id='content' />
          </div>
          <div className='input-container'>
            <label htmlFor='author'>Author</label>
            <input {...author} placeholder='Anecdote author' id='author' />
          </div>
          <div className='input-container'>
            <label htmlFor='url'>URL</label>
            <input {...info} placeholder='For more info' id='url' />
          </div>
          <div>
            <button className='create-button'>Create</button>
            <button
              type='button'
              className='reset-button'
              onClick={resetFields}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`New anecdote '${anecdote.content}' created!`)
    setTimeout(() => {
      setNotification(false)
    }, 5000)
  }

  const match = useMatch('/anecdote/:id')
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null

  return (
    <div className='main-container'>
      <div>
        <Menu />

        {notification ? (
          <div className='notification'>
            <p>{notification}</p>
          </div>
        ) : null}
      </div>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
        <Route
          path='/anecdote/:id'
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
