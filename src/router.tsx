import { createBrowserRouter } from 'react-router-dom'

import ItemDetailPage from './pages/user/ItemDetail'
import CreatePostPage from './pages/user/CreatePost'
import ManagePostPage from './pages/user/ManagePost'
import { AuthenticateType } from './pages/authen/Authenticate/type'
import AuthenticatePage from './pages/authen/Authenticate'
import PaymentPage from './pages/user/Payment'
import CreateExpertisePage from './pages/user/CreateExpertise'
import HomePage from './pages/user/Home'
import RequestAppraiserPage from './pages/appraiser/RequestAppraiser'

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
      },
      {
        path: 'payment',
        element: <PaymentPage />
      }
    ]
  },
  {
    path: 'user',
    children: [
      {
        path: ':id',
        element: <div>User Profile</div>,
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
        element: <CreateExpertisePage />
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
  },
  {
    path: 'appraiser',
    children: [
      {
        path: '',
        element: <RequestAppraiserPage />
      }
    ]
  }
])
export default router