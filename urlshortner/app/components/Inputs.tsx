export default function Inputs() {
    return (
        <div className="flex items-center justify-between flex-col mt-10 ">
            <div className="inline-block border border-dashed border-zinc-800 p-1.5">
                <div className="border border-dashed border-zinc-800 rounded-3xl">
                    <input
                        type="text"
                        placeholder="Enter URL here..."
                        className="w-full bg-transparent px-4 py-3 outline-none bg-white rounded-3xl"
                    />
                </div>
            </div>
            <button
                className="group bg-zinc-400 relative mt-3 overflow-hidden border border-dashed border-zinc-200 px-8 py-3 text-zinc-900 transition-all duration-500"
            >
                <span className="absolute inset-0 -translate-x-full bg-white  transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-200 group-hover:text-black ">
                    Shorten
                </span>
            </button>
        </div>
    )
}