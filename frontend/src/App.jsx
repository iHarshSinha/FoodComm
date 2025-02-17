import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom'

// for user pages
import { ThemeProvider } from './context/ThemeContext'
import UserLayout from './user/layouts/UserLayout'
import HomePage from './user/pages/HomePage'
import MenuPage from './user/pages/MenuPage'
import SickMealPage from './user/pages/SickMealPage'
import NotFoundPage from './user/pages/NotFoundPage'

// for admin pages
import AdminLayout from './admin/layouts/AdminLayout'
import UploadMenu from './admin/pages/UploadMenu'
import FeastMenu from './admin/pages/FeastMenu'
import EditMenu from './admin/pages/EditMenu'
import Feedback from './admin/pages/Feedback'
import WeeklyMenu from './admin/pages/WeeklyMenu'
import Page404 from './admin/pages/Page404'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/weeks-menu' element={<MenuPage />} />
        <Route path='/sick-meal' element={<SickMealPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<UploadMenu />} />
        <Route path='/admin/add-feast' element={<FeastMenu />} />
        <Route path='/admin/edit-menu' element={<EditMenu />} />
        <Route path='/admin/weeks-menu' element={<WeeklyMenu />} />
        <Route path='/admin/feedback' element={<Feedback />} />
        <Route path='*' element={<Page404 />} />
      </Route>
      </>
    )
  )

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
