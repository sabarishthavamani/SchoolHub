import React from 'react'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
    const navigate = useNavigate()
  return (
    <div className="not-found">
    <div className="not-img">
        <img src="images/404.png" />
    </div>
    <button type="button" className="go-home" onClick={()=>{navigate('/home')}} ><img src="images/Arrow-28.png"  />Go Home</button>
</div>
  )
}

export default Page404;