import RFQForm from '@/components/RFQForm'
import { brand } from '@/content/brand'

const whatsappLink = (phone: string, text?: string) =>
  `https://wa.me/${phone.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export default function ContactPage(){
  const phone = brand.whatsapp
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold">Get a Quote</h1>
          <p className="text-gray-700 mt-2">Tell us what you need—no prices on the site, we quote custom.</p>
          <div className="mt-6 p-6 border rounded-brand">
            <RFQForm />
          </div>
        </div>
        <div>
          <div className="rounded-brand border p-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-gray-700 mt-2">Hours: {brand.hours}</p>
            <p className="text-gray-700">Mobile / WhatsApp: {brand.phone}</p>
            <p className="text-gray-700">Email: {brand.email}</p>
            <a className="btn-outline mt-4 inline-block" href={whatsappLink(phone, 'Hello! I would like a printing quote.')}>Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
