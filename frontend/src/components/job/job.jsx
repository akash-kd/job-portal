export default function Job() { 
    return (
        <div className='flex flex-row justify-between border rounded-md w-full h-32 px-10 py-5 my-3'>
            <div className=''>
                <a className='font-semibold text-xl hover:text-sky-500 hover:underline cursor-pointer'>Software Developer Engineer</a>
                <h2 className="my-1">Bengaluru, Karnataka</h2>
                <h2 className="my-1">Google</h2>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h2 className="font-semibold text-xl">Applicants</h2>
                <p className="font-bold text-3xl text-green-500">17</p>
            </div>
        </div>
    )
}