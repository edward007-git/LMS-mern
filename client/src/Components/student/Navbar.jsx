import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'    
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'

const Navbar = () => {

  const { navigate, iseducator } = useContext(AppContext)
  const isCourselistPage = location.pathname.includes('/course-list')
  const { openSignIn } = useClerk()
  const { user } = useUser()

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-12 lg:px-36 py-4
     border-b border-gray-200
     ${isCourselistPage ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-md'}`}>

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          Study<span className="text-blue-600">X</span>
        </span>
      </button>

      <div className='hidden md:flex items-center gap-5 text-gray-600'>
        <div className='flex items-center gap-5'>
          {user &&
            <>
              <button
                onClick={() => navigate('/educator')}
                className="hover:text-gray-900 transition"
              >
                {iseducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>

              <span className="text-gray-300">|</span>

              <Link
                to='/my-enrollment'
                className="hover:text-gray-900 transition"
              >
                My Enrollments
              </Link>
            </>
          }
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className='bg-blue-600 hover:bg-blue-500 transition text-white px-5 py-2 rounded-full'
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-600'>

        <div className='flex items-center gap-2 sm:gap-2 max-sm:text-xs'>
          {user &&
            <>
              <button
                onClick={() => navigate('/educator')}
                className="hover:text-gray-900 transition"
              >
                {iseducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>

              <span className="text-gray-300">|</span>

              <Link
                to='/my-enrollment'
                className="hover:text-gray-900 transition"
              >
                My Enrollments
              </Link>
            </>
          }
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img
              src={assets.user_icon}
              alt="User"
              className='w-8 h-8 object-contain opacity-80 hover:opacity-100 transition'
            />
          </button>
        )}
      </div>

    </div>
  )
}

export default Navbar
