import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"


function ProtectedByAuth({children}) {
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return children
}

export default ProtectedByAuth
