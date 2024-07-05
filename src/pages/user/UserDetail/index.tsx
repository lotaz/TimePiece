import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>User Detail</h1>
      <p>User ID: {id}</p>
    </div>
  )
}

export default UserDetail
