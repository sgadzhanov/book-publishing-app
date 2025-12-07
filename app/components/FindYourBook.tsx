

export default function FindYourBook() {
  return (
    <section className="p-10 bg-white py-20 flex justify-center">
      <div className="bg-slate-100 rounded-lg flex flex-col gap-4 lg:gap-1 lg:flex-row justify-between w-11/12 px-12 py-6 border border-slate-300">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl ">Find your next favorite book</h1>
          <p>Curated picks, events, and more await.</p>
        </div>
        <div className="flex justify-end flex-col">
          <button className='bg-[#FFA273] hover:bg-orange-400 hover:shadow-xl cursor-pointer transition py-2 px-4 font-medium'>
            Browse now
          </button>
        </div>
      </div>
    </section>
  )
}
