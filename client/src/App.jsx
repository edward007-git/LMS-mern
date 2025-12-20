import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/student/Home';
import CoursesList from './Pages/student/CoursesList';
import CourseDetails from './Pages/student/CourseDetails';
import MyEnrollments from './Pages/student/MyEnrollments';
import Player from './Pages/student/Player';
import Loading from './Components/student/Loading';
import Educator from './Pages/educator/Educator';
import Dashboard from './Pages/educator/Dashboard';
import AddCouses from './Pages/educator/AddCourse';
import MyCourses from './Pages/educator/MyCourses';
import StudentsEnrolled from './Pages/educator/StudentsEnrolled';
import Navbar from './Components/student/Navbar';


const App = () => {
  const isEductorRoute=useMatch('/educator/*');
  return (
    <div className='text-default min-h-screen bg-white'>
      {!isEductorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element ={<CoursesList />} />
        <Route path='/course-list/:input' element ={<CoursesList />} />
        <Route path='/my-enrollment' element ={<MyEnrollments/>} />
        <Route path='/course/:id' element ={<CourseDetails />} />
         <Route path='/player/:courseId' element ={<Player/>} />  
         <Route path='/course-list/:input ' element ={<CoursesList />} />
         <Route path='/loading/:input ' element ={<Loading />} />
         <Route path='/educator' element={<Educator/>}>
             <Route path='educator' element={<Dashboard/>} />
           <Route path='add-courses' element={<AddCouses/>} />
           <Route path='my-courses' element={<MyCourses/>} />
           <Route path='student-enrolled' element={<StudentsEnrolled/>} />
         </Route>
        

      </Routes>

    </div>
  )
}

export default App