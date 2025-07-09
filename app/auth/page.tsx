'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function AuthPage() {

  const router = useRouter();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const handleAuth = async () => {
    setLoading(true)
    setMessage(null)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        if (error.message.includes('already registered')) {
          setMessage('❌ This email is already registered. Please log in instead.')
        } else {
          setMessage(`❌ ${error.message}`)
        }
      }
      else setMessage('✅ Check your email to confirm your account.');

    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(`❌ ${error.message}`)
      else {
        setMessage('✅ Logged in successfully!');
        router.push('/')
      }

    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-secondary">
          {isSignUp ? 'Coach Sign Up' : 'Coach Log In'}
        </h2>

        {message && (
          <div
            className={`alert ${message.startsWith('✅') ? 'alert-success' : 'alert-error'
              } mb-4`}
          >
            <span>{message}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAuth()
          }}
          className="space-y-6"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Email address
              </span>
            </label>
            <input
              type="email"
              required
              placeholder="coach@example.com"
              className="input input-bordered input-primary w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Password
              </span>
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="Enter your password"
              className="input input-bordered input-primary w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block text-white text-lg font-semibold hover:scale-105 transition-transform duration-200"
            disabled={loading}
          >
            {loading ? (isSignUp ? 'Signing Up...' : 'Logging In...') : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            className="font-semibold text-purple-700 hover:underline"
            onClick={() => {
              setMessage(null)
              setIsSignUp(!isSignUp)
            }}
            disabled={loading}
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
