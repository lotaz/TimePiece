import { createBrowserRouter } from 'react-router-dom'
import ItemDetailPage from './pages/item/ItemDetail'
import CreatePostPage from './pages/item/CreatePost'
import ManagePostPage from './pages/item/ManagePost'
import CreateExpertisePage from './pages/item/CreateExpertise'
import RequestAppraiserPage from './pages/appraiser/RequestAppraiser'
import AuthenticatePage from './pages/authentication/Authenticate'
import { AuthenticateType } from './pages/authentication/Authenticate/type'
import HomePage from './pages/item/Home'
import PaymentPage from './pages/item/Payment'

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

          return { id }
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

          return { id }
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