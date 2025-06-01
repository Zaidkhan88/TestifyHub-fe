import { ReviewFormComp } from "../components"
import { useReviewLink } from "../context/LinkContext"

function TestimonailFormPage() {
  const {link} = useReviewLink()
  if(!link){
    console.log('Link bnot theere')
  }
  return (
    <div>
      <ReviewFormComp reviewLink={link}/>
    </div>
  )
}

export default TestimonailFormPage
