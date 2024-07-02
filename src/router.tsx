import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import ItemDetailPage from './pages/item/ItemDetail'
import CreatePostPage from './pages/item/CreatePost'
import ManagePostPage from './pages/item/ManagePost'
import CreateExpertisePage from './pages/item/CreateExpertise'
import RequestAppraiserPage from './pages/appraiser/RequestAppraiser'
import AuthenticatePage from './pages/authentication/Authenticate'
import { AuthenticateType } from './pages/authentication/Authenticate/type'
import HomePage from './pages/item/Home'
import PaymentPage from './pages/item/Payment'
import CreateAppraisalPaperPage from './pages/appraiser/CreateAppraisalPaper'
import ViewAppraisalFormPage from './pages/appraiser/ViewAppraisalForm'
import UserInfo from './pages/user/UserInfo'
import AppraisalFormDetailPage from './pages/appraiser/AppraisalFormDetail'
import ScrollToTop from './components/ScollOnTop'

const Root = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <HomePage /> },
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
            path: 'info',
            element: <UserInfo />,
            loader: async ({ params }) => {
              const { id } = params
              return { id }
            }
          }
        ]
      },
      {
        path: 'appraisal',
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
            path: 'dashboard',
            element: <RequestAppraiserPage />
          },
          {
            path: ':id',
            element: <AppraisalFormDetailPage />
          },
          {
            path: ':id/create-appraisal-paper',
            element: <CreateAppraisalPaperPage />
          },
          {
            path: ':id/view-appraisal-form',
            element: <ViewAppraisalFormPage />
          }
        ]
      },
      { path: '*', element: <div>404 Not Found</div> }
    ]
  }
])

export default router
