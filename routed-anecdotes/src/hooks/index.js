import { useState } from 'react'

export const useField = (name, type = 'text') => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const resetName = `reset${name.charAt(0).toUpperCase() + name.slice(1)}`

    return {
        type,
        name,
        value,
        onChange,
        [resetName]: reset
    }
}