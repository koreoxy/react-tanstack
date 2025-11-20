import { Link, useRouter } from '@tanstack/react-router'

import {
  ChevronDown,
  ChevronRight,
  Database,
  Home,
  LogIn,
  LogOut,
  Menu,
  Network,
  ShieldAlert,
  SquareFunction,
  StickyNote,
  X,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { authClient } from '@/lib/auth-client'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({})

  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [error, setError] = useState('failed to logout')

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('')
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [error])

  const handlelogin = () => {
    router.navigate({ to: '/signin' })
  }

  const handlelogout = async () => {
    setError('')
    try {
      await authClient.signOut()
    } catch (e) {
      console.error('Logout failed', e)
      setError('Logout failed. Please try again.')
    }
  }

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <img
              src="/tanstack-word-logo-white.svg"
              alt="TanStack Logo"
              className="h-10"
            />
          </Link>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <div>
            <Link
              to="/todos"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              activeProps={{
                className:
                  'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
              }}
              disabled={!session}
            >
              <Network size={20} />
              <span className="font-medium">Todos</span>
            </Link>

            <div>
              {!session && (
                <div
                  className="tooltip tooltip-bottom"
                  data-tip="Please login to access Notes"
                >
                  <ShieldAlert className="size-4 text-warning" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2">
            {isPending ? null : session ? (
              <button
                aria-label="Logout"
                className="btn btn-ghost btn-sm"
                onClick={handlelogout}
              >
                <LogOut className="size-4" />
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              <button
                aria-label="Login"
                className="btn btn-ghost btn-sm"
                onClick={handlelogin}
              >
                <LogIn className="size-4" />
                <span className="font-medium">Login</span>
              </button>
            )}
          </div>
        </nav>
      </aside>

      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  )
}
