import {useNavigate} from 'react-router-dom'
import {Button} from './index'

function CreateSpace() {
    // const {register,handleSubmit} = useForm()
    const navigate = useNavigate()
    const handleSubmit = ()=>{
        navigate('/createSpace')
    }
  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto text-center">
    {/* Heading */}
    <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
      Click the button to create a new space and get testimonials
    </h4>

    {/* Button */}
    <Button
      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
      onClick={handleSubmit}
    >
      Create a New Space
    </Button>
  </div>
  )
}

export default CreateSpace