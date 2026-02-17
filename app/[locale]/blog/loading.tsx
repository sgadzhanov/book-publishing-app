export default function BlogLoading() {
  return (
    <main className="w-4/5 mx-auto py-24 animate-pulse">
      <div className="h-10 bg-slate-200 rounded w-1/3 mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-video bg-slate-200 rounded-lg mb-4" />
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </main>
  )
}
