import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { CircleX, KeyRound, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (session) {
    router.navigate({ to: '/todos' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Password do not match')
      return
    }

    try {
      authClient.signUp.email({
        name,
        email,
        password,
      })

      router.navigate({
        to: '/todos',
      })
    } catch (err) {
      setError('An unexcpeted error occured')
      console.error('Signup failed : ', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-case-100 pt-12">
      <div className="card bg-case-300 max-w-md">
        <div className="card-body">
          <div className="card-title text-3xl">Create an Account</div>
          <p className="text-base-content/70 mt-2">Sign up to get status</p>

          {error && (
            <div role="alert" className="alert alert-error">
              <CircleX />
              <span>Error : {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="input validator">
                <User />
                <input
                  id="full-name"
                  type="text"
                  required
                  placeholder="Full name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength={3}
                  maxLength={30}
                  title="Only letters, numbers or dash"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </label>
              <p className="validator-hint hidden">
                Must be 3 to 30 characters
              </p>
            </div>

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
                  placeholder="Password"
                  minLength={8}
                  title="Must be more than 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
              </p>
            </div>

            {/* Confirm password */}
            <div className="mt-2">
              <label className="input validator">
                <KeyRound />
                <input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  minLength={8}
                  title="Must be more than 8 characters"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
              </p>
            </div>

            <div className="mt-2">
              <button
                className="btn btn-active btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm text-primary"></span>
                    <span>Creating account...</span>
                  </>
                ) : (
                  'Sign up'
                )}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-base-content/70">Already have an account?</p>{' '}
              <Link to="/signin" className="link link-primary">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
