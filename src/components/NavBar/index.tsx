import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/AuthContext'
import { CanAccess } from '../CanAccess'

export function NavBar () {
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      borderBottom: '1px solid #ccc'
    }}>
    {!isAuthenticated && <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link> }
    {!isAuthenticated && <Link to="/register">Register</Link> }
    {isAuthenticated && <Link to="/">Home</Link> }
    {isAuthenticated && <Link to="/movies/create" style={{ marginLeft: '1rem' }}>Add Movie</Link>}
    <CanAccess permissions={['users.list']}>
      <Link to="/users" style={{ marginLeft: '1rem' }}>Users</Link>
    </CanAccess>

    <CanAccess permissions={['metrics.list']}>
      <Link to="/metrics" style={{ marginLeft: '1rem' }}>Metrics</Link>
    </CanAccess>

    {isAuthenticated && (
      <>
        <span style={{ marginLeft: '1rem', marginRight: '1rem' }}>{user?.email}</span>
        <button
          data-testid="logout-button"
          onClick={() => signOut()}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
        </>
    )}
    </div>

  )
}
