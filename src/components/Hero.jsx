
export default function Hero(){
    return(
        <>
            <h2 class= "font-bold text-left text-4xl mb-10"> Log it. Love it. Vault it!</h2>
            <h3 class = "text-left mt-4 text-3xl font-bold">
                Try <span className="text-left font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">ViewVault</span> and start...
            </h3>
            <div className="text-left font-medium">
                <div className="mt-3">
                    <p>✅ Tracking all content you watch</p>
                    <p>✅ Discovering hidden gems</p>
                    <p>✅ Setting reminders for upcoming releases</p>
                </div>
            </div>
            <div className="bg-[#1a1e32] p-5 mt-10 rounded-md shadow-sm shadow-blue-500/50 text-left">
                <div className="flex gap-2 items-center font-bold text-3xl">
                    <i class="fa-solid fa-circle-info"></i>
                    <p> Did you know.... </p>
                </div>
                <p className="mt-2 font-bold text-2xl"> That the average person spends over 3,000 hours watching content in their lifetime?</p>
                <p className="mt-2 text-md"> 
                    Most viewers can only recall about 20% of what they've watched after just one month. 
                    ViewVault helps you keep track of every show, movie, and video you consume, ensuring you never lose track of those hidden gems. 
                    Our smart recommendation system analyzes your viewing patterns to suggest new content you'll love, saving you countless hours of scrolling and searching.
                </p>
            </div>
            <div className="flex justify-center items-center gap-3 text-3xl my-10 border-b border-[#4649af] pb-5 ">
                <p className=" font-bold">
                    <i class="fa-solid fa-film"></i> Start Tracking Today
                </p>
            </div>


        </>
    )
}