import React, { FormEvent, useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../context/AuthContext'

function initialFormValues () {
  return {
    name: '',
    email: '',
    password: ''
  }
}

export function Register () {
  const [values, setValues] = useState(initialFormValues)
  const [registerrequestStatus, setRegisterRequestStatus] = useState('success')
  const { register } = useContext(AuthContext)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    })
  }

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()

    setRegisterRequestStatus('loading')

    await register(values)

    setRegisterRequestStatus('success')
  }

  useEffect(() => {
    // clean the function to fix memory leak
    return () => setRegisterRequestStatus('success')
  }, [])

  return (
    <div>
      <form
        noValidate
        data-testid="register-form"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={values.name}
            type="text"
            name="name"
            id="name"
            data-testid="register-input-name"
            disabled={registerrequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input

            value={values.email}
            type="email"
            name="email"
            id="email"
            data-testid="register-input-email"
            disabled={registerrequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            data-testid="register-input-password"
            disabled={registerrequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          data-testid="register-button"
          disabled={registerrequestStatus === 'loading'}
        >
          Register
        </button>
      </form>
    </div>
  )
}
