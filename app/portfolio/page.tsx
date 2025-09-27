export default function PortfolioPage(){
  return (
    <section className="section">
      <div className="container">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {Array.from({length: 12}).map((_,i)=>(
            <div key={i} className="aspect-[4/3] rounded-brand bg-gray-100 border" />
          ))}
        </div>
      </div>
    </section>
  )
}
