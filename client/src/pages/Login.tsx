import React, { useEffect, useState } from 'react'
import './Login.scss'

function Login() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up' | null>(null)

  const changeMode = () => {
    setMode((mode) => (mode === 'sign-in' ? 'sign-up' : 'sign-in'))
  }

  useEffect(() => {
    //Entering the signin page with an animation
    setTimeout(() => {
      setMode('sign-in')
    }, 200)
  }, [])

  return (
    <div id='container' className={`container ${mode}`}>
      {/* Form Section */}
      <div className='row'>
        {/* Sign up section */}
        <div className='col align-items-center flex-col sign-up'>
          <div className='form-wrapper align-items-center'>
            <div className='form sign-up'>
              <div className='input-group'>
                <input type='text' placeholder='Username' />
              </div>
              <div className='input-group'>
                <input type='email' placeholder='Email' />
              </div>
              <div className='input-group'>
                <input type='password' placeholder='Password' />
              </div>
              <div className='input-group'>
                <input type='password' placeholder='Confirm password' />
              </div>
              <button>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={changeMode} className='pointer'>
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* Sign in section */}
        <div className='col align-items-center flex-col sign-in'>
          <div className='form-wrapper align-items-center'>
            <div className='form sign-in'>
              <div className='input-group'>
                <input type='text' placeholder='Username' />
              </div>
              <div className='input-group'>
                <input type='password' placeholder='Password' />
              </div>
              <button>Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={changeMode} className='pointer'>
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className='row content-row'>
        {/* Sign In Content */}
        <div className='col align-items-center flex-col'>
          <div className='text sign-in'>
            <h2>Welcome</h2>
          </div>
        </div>
        {/* Sign up Content */}
        <div className='col align-items-center flex-col'>
          <div className='text sign-up'>
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
