import Header from '@/components/storefront/Header/Header'
import Footer from '@/components/storefront/Footer/Footer'
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col" style={{background:'var(--cream)'}}>
      <Header locale="ar" />
      <main className="flex-1" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'6rem 1rem'}}>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'3rem',marginBottom:'1rem'}}>🚧</p>
          <h1 style={{color:'var(--espresso)',fontWeight:700,fontSize:'1.5rem',marginBottom:'0.5rem'}}>قريباً</h1>
          <p style={{color:'var(--text-light)'}}>هذه الصفحة قيد الإنشاء</p>
        </div>
      </main>
      <Footer locale="ar" />
    </div>
  )
}
