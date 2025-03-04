import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function Authentication(props) {
    const { handleCloseModal } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp ] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error, setError] = useState("")

    const {globalUser, globalData, setGlobalData, isLoading, signup, login, logout} = useAuth()

    async function handleAuthenticate() {
        // Guard Clause
        if(!email){
            setError("Must enter and email")
            return
        }

        if(!email.includes('@')){
            setError("Email must be valid")
            return
        }

        if(!password){
            setError("Must enter a password")
            return
        }

        if(password.length < 6){
            setError("Password must be greater than 6 character or more")
            return
        }

        if (isAuthenticating){
            return
        }

        try {
            setIsAuthenticating(true)
            setError(null)
            if (isSignUp){
                // Register a user
                await signup(email, password)
            } else {
                // Login a user
                await login(email, password)
            }
            console.log("USER AUTHENTICATED")
            handleCloseModal()
        } catch (err) {
            console.log(err.message)
            setError(err.message)
        } finally {
            setIsAuthenticating(false)
        }

    }
  
    

    return (
        <>

            <h1 className="text-3xl font-bold"> {isSignUp ? "Sign up" : "Sign in"} </h1>
            <p className="text-[18px]">{isSignUp ? "Register your account" : "Login to your account"}</p>

            {error && (<p>❌{error}</p>)}

            <input className="ring ring-[#323c71] rounded-md pl-3 py-2 bg-[#0e101e] outline-0 focus:ring-[#4649af]" placeholder="Email" type = "email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className="ring ring-[#323c71] rounded-md pl-3 py-2 bg-[#0e101e] outline-0 focus:ring-[#4649af]" placeholder="*********" type = "password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button                 
                className="text-inherit flex items-center gap-2 hover:cursor-pointer bg-white dark:bg-[#05070f] w-fit font-medium px-4 py-1 border-[1.5px] border-[#bed1e7] dark:border-[#323c71] rounded-md shadow-[2px_2px_0px_0px_#bed1e7] dark:shadow-[2px_2px_0px_0px_#323c71] transition-all duration-200 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-55 disabled:hover:shadow-[2px_2px_0px_0px_#bed1e7] dark:disabled:hover:shadow-[2px_2px_0px_0px_#323c71] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:cursor-default"
                onClick = {handleAuthenticate}
            >
                 Submit
            </button>

            <hr/>
            <p className="text-[18px]" >{isSignUp ? "Already have an account?" : "Don't have an account?"}</p>
            <button                 
                className="text-inherit flex items-center gap-2 hover:cursor-pointer bg-white dark:bg-[#05070f] w-fit font-medium px-4 py-1 border-[1.5px] border-[#bed1e7] dark:border-[#323c71] rounded-md shadow-[2px_2px_0px_0px_#bed1e7] dark:shadow-[2px_2px_0px_0px_#323c71] transition-all duration-200 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-55 disabled:hover:shadow-[2px_2px_0px_0px_#bed1e7] dark:disabled:hover:shadow-[2px_2px_0px_0px_#323c71] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:cursor-default"
                onClick={()=>{setIsSignUp(!isSignUp)}}
            >
                {isSignUp ? "Sign in" : "Sign Up"}
            </button>
 
        </>
    )
}



      