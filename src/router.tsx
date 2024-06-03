import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import ItemDetailPage from './pages/ItemDetail'
import UserPage from './pages/Authenticate'
import ExpertisePage from './pages/Expertise'
import CreatePostPage from './pages/CreatePost'
import AuthenticatePage from './pages/Authenticate'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: 'item',
    children: [
      {
        path: ':id',
        element: <ItemDetailPage />,
        loader: async ({ params }) => {
          const { id } = params
          // Fetch item details using the id
          // For example: const itemData = await fetchItemDetails(id);
          return { id } // Return the data that the component needs
        }
      }
    ]
  },
  {
    path: 'user',
    children: [
      {
        path: ':id',
        element: <UserPage />,
        loader: async ({ params }) => {
          const { id } = params
          // Fetch user details using the id
          // For example: const userData = await fetchUserDetails(id);
          return { id } // Return the data that the component needs
        }
      }
    ]
  },
  {
    path: '*',
    element: <div>404 Not Found</div>
  },
  {
    path: 'expertise',
    children: [
      {
        path: 'online-form',
        element: <ExpertisePage />
      }
    ]
  },
  {
    path: 'watch',
    children: [
      {
        path: 'create-post',
        element: <CreatePostPage />
      }
    ]
  },
  {
    path: 'authenticate',
    element: <AuthenticatePage />
  }
])
export default router
