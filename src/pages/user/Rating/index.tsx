import { AppPath } from '@/services/utils'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import useSWR from 'swr'
import SellerInfo from './components/SellerInfo'
import RatingItem from './components/RatingItem'
import { Feedback } from './type'

const RatingPage = () => {
  const { id } = useLoaderData() as { id: number }

  const [feedbacks, setFeedbacks] = useState<Feedback[]>()

  const { data: feedbackData, isLoading: loadingFeedback } = useSWR(
    AppPath.GET_FEEDBACKS_BY_SELLER_ID(id)
  )

  useEffect(() => {
    if (feedbackData) {
      setFeedbacks(feedbackData)
    }
  }, [feedbackData])

  return (
    <Box
      component={'div'}
      sx={{
        marginTop: 12,
        marginBottom: 4,
        minHeight: 'calc(100vh - 340px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <SellerInfo sellerId={id} />
      <Box
        sx={{
          display: 'flex',
          padding: '2vw',
          backgroundColor: 'white',
          height: 'fit-content',
          borderRadius: '10px',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto'
        }}
      >
        {!loadingFeedback && (
          <div>
            {feedbacks?.map((feedback) => (
              <RatingItem
                key={feedback.id}
                name={feedback.userName}
                rating={feedback.rating}
                reviewDate={feedback.timestamp}
                reviewText={feedback.comment}
                productImage={feedback.watch.imageUrl}
                productName={feedback.watch.name}
                productPrice={feedback.watch.price}
                loading={loadingFeedback}
              />
            ))}
          </div>
        )}
      </Box>
    </Box>
  )
}

export default RatingPage
