
export default function ScrollPage({children}) {
    return (
        <>
        <div className={`relative min-h-screen flex`}>
            <div className="max-w-screen-xl mx-auto flex justify-center items-center " style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>                
                {children}
            </div>
        </div>
        
        </>
    )
}
