import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context'
import { DARK, LIGHT } from '../constants'
import { InlineIcon } from '@iconify/react'
import crescentMoon from '@iconify/icons-emojione/crescent-moon'
import sun from '@iconify/icons-emojione/sun'

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const [isActive, setIsActive] = useState(false)

  return (
    <nav
      className={`navbar is-fixed-top ${
        theme === DARK ? 'is-dark' : theme === LIGHT ? 'is-light' : null
      }`}
    >
      <div className='container'>
        <div className='navbar-brand'>
          <a
            className='navbar-burger'
            onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div
          className={`navbar-menu ${isActive ? 'is-active' : null} 
        ${
          theme === DARK
            ? 'has-background-dark'
            : theme === LIGHT
            ? 'has-background-light'
            : null
        }
        `}
        >
          <div className='navbar-end'>
            <div className='navbar-item'>
              <div
                className='field is-grouped'
                style={{ justifyContent: 'center' }}
              >
                <div className='control'>
                  <span className='icon'>
                    <InlineIcon icon={crescentMoon} />
                  </span>
                </div>
                <div
                  className='control'
                  style={{ marginRight: 0 }}
                  onClick={() =>
                    setTheme((prevTheme) => (prevTheme === DARK ? LIGHT : DARK))
                  }
                >
                  <input
                    type='checkbox'
                    name='themeToggler'
                    className='switch is-danger'
                    checked={theme === LIGHT ? true : false}
                    readOnly={true}
                    tabIndex='0'
                  />
                  <label htmlFor='themeToggler'></label>
                </div>
                <div className='control'>
                  <span className='icon'>
                    <InlineIcon icon={sun} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
