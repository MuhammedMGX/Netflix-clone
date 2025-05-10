import NotFound from '@/../public/NotFound.png'


export default function notfound() {
  return (
    <>
    
    <div className="h-screen w-full overflow-hidden relative notfound bg-no-repeat bg-cover">

        <div className="w-full md:w-1/2 h-full mx-auto z-1 text-center pt-[20%]">
            <h1 className='text-white text-6xl xl:9xl font-semibold'>Lost your way?</h1>
            <p className='text-white text-xl my-5'>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
            <button className='flex justify-center items-center rounded-md mx-auto text-black px-4 py-2 font-semibold bg-white hover:bg-gray-200 transition'>Netflix Home</button>
            
            <div className='before:block before:absolute before:w-[3px] before:h-full before:ms-[20%] relative before:bg-red-600'>
                <p className='text-white text-2xl my-9 relative'>Error Code <span className='font-extrabold'>NSES-404</span></p>
            </div>

        </div>

    </div>
    
    </>
  )
}
