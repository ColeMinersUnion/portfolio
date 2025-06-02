export default function ScrollPage({children}) {
    return (
        <>
        <div className={`relative min-h-screen flex`}>
            <div className="container max-w-screen-xl mx-auto flex justify-center items-center ">                
                {children}
            </div>
        </div>
        
        </>
    )
}