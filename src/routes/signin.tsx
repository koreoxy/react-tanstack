import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { CircleX, KeyRound, Mail } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (session) {
    router.navigate({ to: '/todos' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      })

      if (res.error) {
        setError(res.error.message || 'Invalid email or password')
        return
      }

      router.navigate({ to: '/todos' })
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Signin failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-case-100 pt-12">
      <div className="card bg-case-300 max-w-md">
        <div className="card-body">
          <div className="card-title text-3xl">Welcome Back</div>
          <p className="text-base-content/70 mt-2">Sign in to continue</p>

          {error && (
            <div role="alert" className="alert alert-error">
              <CircleX />
              <span>Error : {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mt-2">
              <label className="input validator">
                <Mail />
                <input
                  id="email"
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>

            {/* Password */}
            <div className="mt-2">
              <label className="input validator">
                <KeyRound />
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="Password"
                  title="Must be more than 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </label>
            </div>

            <div className="mt-2">
              <button
                className="btn btn-active btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm text-primary"></span>
                    <span>Signing in…</span>
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base-content/70">Don't have an account?</p>{' '}
              <Link to="/signup" className="link link-primary">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
