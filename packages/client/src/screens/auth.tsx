import { GiAstronautHelmet } from "react-icons/gi"
import { BsFillMenuButtonWideFill } from "react-icons/bs"

import GlassBox from "../components/glassBox"
import React, { useState } from "react"
import { trpc } from "../trpc"
import Loader from "../components/loader"
import { errorParser } from "../utils/errorParser"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Auth = () => {
    const [type, setType] = useState<"login" | "signup">("login")
    const {state} = React.useContext(UserContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (state.isAuth) {
            navigate("/")
        }
    }, [state])

    return (
        <div className="bg-gradient-to-br from-secondary from-0% via-primary via-10% to-secondary to-90% w-screen h-screen flex flex-col items-center text-white">
            <h1 className="text-8xl font-bold my-8">FiFi</h1>
            <div className="lg:w-[50%] w-[90%]">
                <GlassBox>
                    {
                        type === "login" ? <LoginCard setType={setType}/> : <SignUpCard setType={setType}/>
                    }
                </GlassBox>
            </div>
        </div>
    )
}

interface AuthCardProps {
    setType: (type: "login" | "signup") => void
}

const LoginCard: React.FC<AuthCardProps> = ({ setType }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {dispatch} = React.useContext(UserContext)

    const navigate = useNavigate()

    const loginMutation = trpc.loginUser.useMutation()

    const handleLogin = (e: any) => {
        e.preventDefault()
        loginMutation.mutate({
            email,
            password
        })
    }

    React.useEffect(() => {
        if (loginMutation.isSuccess) {
            dispatch({ type: "USER_LOGGED_IN",  payload: {id: "", email: "" }})
            navigate("/")
        }
    }, [loginMutation.isSuccess])

    return (
        <div className="p-4 lg:px-16 ">
        <GiAstronautHelmet size={46} />
        <h1 className="text-2xl font-medium my-4"> Sign in</h1>

        { loginMutation.error && <p className="bg-red-500 p-2 text-white rounded-md my-2">{errorParser(loginMutation.error.message)}</p> }
        { loginMutation.isSuccess && <p className="bg-green-500 p-2 text-white rounded-md my-2">User logged in successfully</p> }
        <div className="flex justify-center">
            { loginMutation.isLoading && <div className="h-[100px] w-[100px]"><Loader /></div> }
        </div>

        <input 
            className="bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input 
            className="bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white my-4"
            placeholder="Password"    
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <p>New to this site? <span className="text-primary cursor-pointer" onClick={() => setType("signup")}> Sign up</span></p>

        <button 
            className="bg-primary rounded-md w-full p-2 text-white font-medium mt-4 uppercase"
            onClick={handleLogin}
        >
            Sign in
        </button>
        </div>
    )
}

const SignUpCard: React.FC<AuthCardProps> = ({ setType }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    const registerMutation = trpc.registerUser.useMutation()
    const {dispatch} = React.useContext(UserContext)

    const navigate = useNavigate()

    const handleRegister = (e: any) => {
        e.preventDefault()
        registerMutation.mutate({
            email,
            password,
            passwordConfirm: confirmPassword,
            name
        })
    }

    React.useEffect(() => {
        if (registerMutation.isSuccess) {
            dispatch({ type: "USER_LOGGED_IN",  payload: {id: "", email: "" }})
            navigate("/")
        }
    }, [registerMutation.isSuccess])

    return (
        <div className="p-4 lg:px-16 ">
        <BsFillMenuButtonWideFill size={46} />
        <h1 className="text-2xl font-medium my-4"> Sign Up</h1>
        
        { registerMutation.error && <p className="bg-red-500 p-2 text-white rounded-md my-2">{errorParser(registerMutation.error.message)}</p> }
        { registerMutation.isSuccess && <p className="bg-green-500 p-2 text-white rounded-md my-2">User registered successfully</p> }
        <div className="flex justify-center">
            { registerMutation.isLoading && <div className="h-[100px] w-[100px]"><Loader /></div>}
        </div>

        <input 
            className="bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white"
            placeholder="Name"    
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        
        <input 
            className="bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white mt-4"
            placeholder="Email"    
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input 
            className="bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white mt-4"
            placeholder="Password"    
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <input 
            className="bg-transparent focus:outline-none rounded-md w-full border-[1px] border-white p-2 placeholder:text-white my-4"
            placeholder="Confirm Password"    
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <p>Already a user? <span className="text-primary cursor-pointer" onClick={() => setType("login")}> Sign in</span></p>

        <button 
            className="bg-primary rounded-md w-full p-2 text-white font-medium mt-4 uppercase"
            onClick={handleRegister}
        >Sign up</button>
        </div>
    )
}


export default Auth