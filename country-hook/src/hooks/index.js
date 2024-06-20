import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name) {
            const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
            axios
                .get(`${baseUrl}/${name}`)
                .then(res => {
                    setCountry({
                        found: true,
                        data: {
                            name: res.data.name.common,
                            capital: res.data.capital[0],
                            population: res.data.population,
                            flag: res.data.flags.png
                        }
                    })
                })
                .catch(error => {
                    setCountry({
                        found: false,
                        data: null
                    })
                })
        }
    }, [name])

    return country
}