import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import CreateAppraisalPaper from './components/CreateAppraisalPaper'

const CreateAppraisalPaperPage = () => {
  return (
    <AppraiserLayout>
      <CreateAppraisalPaper itemName={''} itemCode={''} />
    </AppraiserLayout>
  )
}

export default CreateAppraisalPaperPage
