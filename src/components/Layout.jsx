import { useState } from "react"
import Modal from "./Modal"
import Authentication from "./Authentication"
import { useAuth } from "../contexts/AuthContext"

export default function Layout(props){
    const {children} = props
    const [ isModal, setIsModal ] = useState(false)
    const { globalUser, logout } = useAuth()

    const header = (
        <header className="flex justify-between items-center relative">
            <div className="flex flex-col">
                <div>
                    <p className="text-left text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        ViewVault
                    </p>
                </div>
                <div className="text-left text-primary text-sm font-medium">
                    <p>Your media companion</p>
                </div>
            </div>
            {globalUser ? (
                <button 
                    className="text-inherit flex items-center gap-2 hover:cursor-pointer bg-white dark:bg-[#05070f] w-fit font-medium px-2 py-2 border-[1.5px] border-[#bed1e7] dark:border-[#323c71] rounded-md shadow-[2px_2px_0px_0px_#bed1e7] dark:shadow-[2px_2px_0px_0px_#323c71] transition-all duration-200 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-55 disabled:hover:shadow-[2px_2px_0px_0px_#bed1e7] dark:disabled:hover:shadow-[2px_2px_0px_0px_#323c71] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:cursor-default"
                    onClick={()=>{logout()}}
                >
                    <p className="font-bold"> Logout</p>
                    <i className="fa-solid fa-clapperboard"></i>            
                </button>
            ): (
                <button 
                className="text-inherit flex items-center gap-2 hover:cursor-pointer bg-white dark:bg-[#05070f] w-fit font-medium px-2 py-2 border-[1.5px] border-[#bed1e7] dark:border-[#323c71] rounded-md shadow-[2px_2px_0px_0px_#bed1e7] dark:shadow-[2px_2px_0px_0px_#323c71] transition-all duration-200 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-55 disabled:hover:shadow-[2px_2px_0px_0px_#bed1e7] dark:disabled:hover:shadow-[2px_2px_0px_0px_#323c71] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:cursor-default"
                onClick={()=>{setIsModal(true)}}
                >
                    <p className="font-bold">Sign up free</p>
                    <i className="fa-solid fa-clapperboard"></i>            
                </button>

            )}
        </header>
    )

    const footer = (
        <footer className="text-left mt-auto pt-10">
            <hr className="text-[#4649af] mb-5"/>
            <p><span className="text-left text-md font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">ViewVault</span> was made by <a target="_blank" href="https://www.youtube.com/watch?v=xvFZjo5PgG0" className="text-blue-500 hover:cursor-pointer hover:underline">Derin Karas</a></p>
            <p>Track your content with ease</p>
        </footer>
    )

    const handleCloseModal = () => (setIsModal(false))


    return(
        <div className="lg:px-35 flex flex-col min-h-screen">
            {header}
            {isModal && (
                <Modal handleCloseModal = {handleCloseModal}>
                    <Authentication handleCloseModal = {handleCloseModal}/>
                </Modal>
            )}
            <main className="flex-grow mt-15">
                {children}
            </main>
            {footer}
        </div>
    )
}