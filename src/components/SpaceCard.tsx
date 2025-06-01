import { useNavigate } from "react-router";
interface Space{
    _id: string;
    createdAt :string;
    customMsg:string;
    questions:string[];
    spaceName:string
    uniqueLink:string;
}
interface SpaceCardProps {
  space: Space;
}
function SpaceCard({space}:SpaceCardProps) {
  // console.log('spaces from spaceCard',space)
  const navigate  =useNavigate();
  return (
   <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 w-full max-w-md mx-auto hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{space.spaceName}</h2>
      <p className="text-gray-700 mb-4">{space.customMsg}</p>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-800">Questions:</h3>
        <ul className="list-disc list-inside text-gray-600">
          {space.questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        Created At: {new Date(space.createdAt).toLocaleDateString()}
      </div>

      {/* <a
        // href={space.uniqueLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Visit Space
      </a> */}
      <a
        // href={space.uniqueLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 ml-28 text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={()=>navigate(`/testimonials/${space._id}`)}
      >
        View Responses
      </a>
    </div>

  )
}

export default SpaceCard
