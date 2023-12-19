export default function Header(){
    return (
        <>
          <nav className="flex px-8 py-3 bg-slate-950 text-white justify-between">
            <div>
                Trellix 
                A Remix Demo
            </div>
            <div className="flex gap-8">
                <p>VIDEOS</p>
                <p>SOURCE</p>
                <p>DOCS</p>
            </div>
            <div>
                LOG IN 
            </div>
            </nav>  
        </>
    )
}