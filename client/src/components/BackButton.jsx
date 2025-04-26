import { CircleArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({url}) => {
  return (
    <div className="text-center">
            <Link to={url}
              type="submit"
              title='Go_Back'
              className=" bg-[#800020] text-white font-semibold rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            >
              <CircleArrowLeftIcon />
            </Link>
          </div>
  )
}

export default BackButton
