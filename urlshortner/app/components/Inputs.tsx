interface InputsProps {
    value: string;
    expiresIn: "1d" | "1w" | "1m";
    onValueChange: (value: string) => void;
    onExpiresInChange: (value: "1d" | "1w" | "1m") => void;
    onSubmit: () => void;
    loading?: boolean;
}

export default function Inputs({
    value,
    expiresIn,
    onValueChange,
    onExpiresInChange,
    onSubmit,
    loading = false,
}: InputsProps) {
    return (
        <div className="mt-2 flex w-full flex-col items-center justify-between">
            <div className="inline-block w-full max-w-full border border-dashed border-zinc-800 p-1.5 sm:w-[95%]">
                <div className="border border-dashed border-zinc-800 rounded-3xl overflow-hidden">
                    <input
                        type="url"
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                        placeholder="Enter URL here..."
                        className="w-full min-w-0 bg-transparent px-3 py-3 outline-none bg-white rounded-3xl text-sm text-zinc-900 sm:px-4 sm:text-base"
                    />
                </div>
            </div>
            <div className="mt-3 inline-block w-full max-w-full border border-dashed border-zinc-800 p-1.5 sm:w-[95%]">
                <div className="border border-dashed border-zinc-800 rounded-3xl overflow-hidden">
                    <select
                        value={expiresIn}
                        onChange={(e) => onExpiresInChange(e.target.value as "1d" | "1w" | "1m")}
                        className="w-full min-w-0 bg-white px-3 py-3 outline-none rounded-3xl text-sm text-zinc-900 sm:px-4 sm:text-base"
                    >
                        <option value="1d">Expires in 1 day</option>
                        <option value="1w">Expires in 1 week</option>
                        <option value="1m">Expires in 1 month</option>
                    </select>
                </div>
            </div>
            <button
                onClick={onSubmit}
                disabled={loading}
                className="group relative mt-3 w-full max-w-[180px] overflow-hidden border border-dashed border-zinc-200 bg-zinc-400 px-6 py-3 text-sm text-zinc-900 transition-all duration-500 sm:text-base"
            >
                <span className="absolute inset-0 -translate-x-full bg-white  transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative z-10 transition-colors duration-200 group-hover:text-black ">
                    {loading ? "Working..." : "Shorten"}
                </span>
            </button>
        </div>
    )
}
