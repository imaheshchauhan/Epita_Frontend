import { AxiosError } from 'axios'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { api } from '../../services/api'
import { setAuthorizationHeader } from '../../services/interceptors'
import { createTokenCookies, getToken, removeTokenCookies } from '../../utils/tokenCookies'

interface User {
  email: string
  permissions: string[]
  roles: string[]
}

interface SignInCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void | AxiosError>
  signOut: () => void
  register: (credentials: RegisterCredentials) => Promise<void | AxiosError>
  user: User
  isAuthenticated: boolean
  loadingUserData: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>()
  const [loadingUserData, setLoadingUserData] = useState(true)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = getToken()
  const isAuthenticated = Boolean(token)
  const userData = user as User

  async function signIn ({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/v1/auth/login', { email, password })
      const { token, refreshToken, permissions, roles } = response.data

      createTokenCookies(token, refreshToken)
      setUser({ email, permissions, roles })
      setAuthorizationHeader(api.defaults, token)
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  async function register ({ name, email, password }: RegisterCredentials) {
    try {
      const response = await api.post('/v1/auth/register', { name, email, password })
      const { token, refreshToken, permissions, roles } = response.data

      createTokenCookies(token, refreshToken)
      setUser({ email, permissions, roles })
      setAuthorizationHeader(api.defaults, token)
    } catch (error) {
      const err = error as AxiosError
      return err
    }
  }

  function signOut (pathname = '/login') {
    removeTokenCookies()
    setUser(null)
    setLoadingUserData(false)
    navigate(pathname)
  }

  useEffect(() => {
    if (!token) signOut(pathname)
  }, [pathname, token])

  useEffect(() => {
    const token = getToken()

    async function getUserData () {
      setLoadingUserData(true)

      try {
        const email = user?.email
        const response = await api.get('/v1/users/email', { params: { email } })

        if (response?.data) {
          const { email, permissions, roles } = response.data
          setUser({ email, permissions, roles })
        }
      } catch (error) {
        signOut()
      }

      setLoadingUserData(false)
    }

    if (token) {
      setAuthorizationHeader(api.defaults, token)
      getUserData()
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: userData,
      loadingUserData,
      signIn,
      signOut,
      register
    }}>
      {children}
    </AuthContext.Provider>
  )
}
