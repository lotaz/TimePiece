import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import ItemDetailPage from './pages/ItemDetail'
import UserPage from './pages/Authenticate'
import ExpertisePage from './pages/Expertise'
import CreatePostPage from './pages/CreatePost'
import AuthenticatePage from './pages/Authenticate'
import ManagePostPage from './pages/ManagePost'
import { AuthenticateType } from './pages/Authenticate/type'

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
    path: 'post',
    children: [
      {
        path: 'create',
        element: <CreatePostPage />
      },
      {
        path: 'manage',
        element: <ManagePostPage />,
        loader: async () => {
          return { data: 'manage' }
        }
      }
    ]
  },
  {
    path: 'authenticate',
    children: [
      {
        path: 'login',
        element: <AuthenticatePage />,
        loader: async () => {
          return { type: AuthenticateType.Login }
        }
      },
      {
        path: 'register',
        element: <AuthenticatePage />,
        loader: async () => {
          return { type: AuthenticateType.Register }
        }
      }
    ]
  }
])
export default router