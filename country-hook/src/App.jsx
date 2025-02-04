import React, { useState } from 'react'
import { useField, useCountry } from './hooks'
import './css/index.css'

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div className='not-found-container'>
        <h2>Not found...</h2>
      </div>
    )
  }

  return (
    <div className='result-container'>
      <h2 className='country-name'>{country.data.name}</h2>
      <div className='country-info-container'>
        <p>Capital:</p> <p>{country.data.capital}</p>{' '}
      </div>
      <div className='country-info-container'>
        <p>Population:</p> <p>{country.data.population}</p>
      </div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
        className='flag'
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div className='main-container'>
      <div className='sub-container'>
        <div className='title-container'>
          <h1 className='title'>Country Search</h1>
          <p className='sub-title'>Enter a country name to get information</p>
        </div>
        <form onSubmit={fetch}>
          <input
            {...nameInput}
            placeholder='Search for a country...'
            className='search-input'
          />
          <button className='search-button'>Search</button>
        </form>
        <Country country={country} />
      </div>
    </div>
  )
}

export default App
