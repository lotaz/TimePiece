import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import CreateAppraisalPaper from './components/CreateAppraisalPaper'
import { useParams } from 'react-router-dom'

const CreateAppraisalPaperPage = () => {
  const { id } = useParams()

  return (
    <AppraiserLayout>
      <CreateAppraisalPaper id={id} />
    </AppraiserLayout>
  )
}

export default CreateAppraisalPaperPage
