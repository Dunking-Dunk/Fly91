import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const ReviewBack = () => {
    const navigate = useNavigate()

  return (
    <div className="flex pl-4 ml-auto w-1/2 space-x-4">
    <Button
      type="button"
      className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-600"
      onClick={() => {
        navigate(-1)
      }}
    >
      Back
    </Button>
    <Button
      type="submit"
      className="flex-1 p-6 bg-green-500 hover:bg-green-600"
    >
      Review
    </Button>
  </div>
  )
}

export default ReviewBack