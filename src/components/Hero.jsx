
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
                <p className="mt-2 font-bold text-2xl">That caffeine's half-liofe is about 5 hours?</p>
                <p className="mt-2 text-md"> 
                    This means the average person thinks they're spending $70 when they're actually spending $100. 
                    UpOnly eliminates this costly blind spot by showing you exactly where every dollar goes, in real-time.
                    No more end-of-month surprises or wondering why your account balance is lower than expected. 
                    Our smart tracking replaces uncertainty with crystal-clear insights, so you can make confident money moves and watch your wealth grow systematically.
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