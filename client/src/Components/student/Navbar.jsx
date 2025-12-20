
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets';    
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';

const Navbar = () => {

  const { navigate,iseducator}=useContext(AppContext)
  const isCourselistPage = location.pathname.includes('/course-list');
  const {openSignIn} = useClerk();
  const {user} = useUser(); 
  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-12 lg:px-36 border-b border-gray-500 py-4
     ${isCourselistPage ? 'bg-white shadow-md' : 'bg-cyan-100/70'}`}>
     
     <button
  onClick={() => navigate('/')}
  className="flex items-center gap-2 cursor-pointer"
>

  <span className="text-xl font-semibold tracking-tight">
    Study<span className="text-blue-600">X</span>
  </span>
</button>

      <div className='hidden md:flex items-center gap-5 text-gray-500'>
      <div className='flex items-center gap-5'>
       
       { user &&
        <> 
        <button onClick={()=>navigate('/educator')} >{iseducator ? 'Educator Dashboard' :
          'Become Educator'}</button>
       |<Link to='/my-enrollment'>My Enrollments</Link>
       
        </>}
      </div>
      
      {user ?<UserButton/> :
      <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>}
</div>
      {/* Mobile Navbar */}
      
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
    
       <div className='flex items-center gap-2 sm:gap-2 max-sm:text-xs'>
               
       { user &&
        <> 
        <button onClick={()=>navigate('/educator')} >{iseducator ? 'Educator Dashboard' :
          'Become Educator'}</button>
       |<Link to='/my-enrollment'>My Enrollments</Link>
       
        </>}
         </div>
        
        {user ?<UserButton/> :
          <button onClick={()=>openSignIn()}> <img
  src={assets.user_icon}
  alt="User"
  className='w-8 h-8 object-contain'
 
/></button>}



      </div>

        
    
    
    
    </div>
  )
}

export default Navbar