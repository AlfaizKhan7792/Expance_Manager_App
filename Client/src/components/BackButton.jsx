import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = ({url}) => {
  return (
    <div className="text-center">
            <Link to={url}
              type="submit"
              className="px-6 py-3 w-full bg-[#800020] text-white font-semibold mt-5 rounded-lg hover:bg-[#a41c30] focus:outline-none focus:ring-2 focus:ring-[#800020] transition"
            >
              Go Back
            </Link>
          </div>
  )
}

export default BackButton
