'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Trash2, Copy, Search, Grid, List } from 'lucide-react'

const MEDIA = [
  { id:'m1', name:'antique-clock.jpg',   size:'1.2 MB', url:'https://images.unsplash.com/photo-1508169351866-777fc0047ac5?w=300&q=70', date:'2024-12-10' },
  { id:'m2', name:'chinese-vase.jpg',    size:'980 KB', url:'https://images.unsplash.com/photo-1605433247501-698405495b9d?w=300&q=70', date:'2024-12-10' },
  { id:'m3', name:'classic-chair.jpg',   size:'1.5 MB', url:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=70', date:'2024-12-11' },
  { id:'m4', name:'chandelier.jpg',      size:'2.1 MB', url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70', date:'2024-12-11' },
  { id:'m5', name:'gramophone.jpg',      size:'870 KB', url:'https://images.unsplash.com/photo-1516737490857-848138c6e0a2?w=300&q=70', date:'2024-12-12' },
  { id:'m6', name:'painting.jpg',        size:'1.8 MB', url:'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=300&q=70', date:'2024-12-12' },
  { id:'m7', name:'tea-set.jpg',         size:'1.1 MB', url:'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&q=70', date:'2024-12-13' },
  { id:'m8', name:'jewelry-box.jpg',     size:'760 KB', url:'https://images.unsplash.com/photo-1584811644165-33db81f96b85?w=300&q=70', date:'2024-12-13' },
]

export default function AdminMedia() {
  const [view, setView]     = useState<'grid'|'list'>('grid')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = MEDIA.filter(m => m.name.includes(search))

  const toggleSelect = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display:'flex', gap:'0.75rem', alignItems:'center', marginBottom:'1.25rem', flexWrap:'wrap' }}>
        <button className="btn-primary" style={{ display:'flex', alignItems:'center', gap:'0.375rem', padding:'0.625rem 1.25rem', fontSize:'0.875rem' }}
          onClick={() => inputRef.current?.click()}>
          <Upload size={15} /> رفع ملفات
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*" style={{ display:'none' }} />
        {selected.length > 0 && (
          <button style={{ padding:'0.625rem 1rem', borderRadius:'0.5rem', border:'1px solid #ef4444', color:'#dc2626', background:'none', cursor:'pointer', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:'0.375rem' }}>
            <Trash2 size={14} /> حذف ({selected.length})
          </button>
        )}
        <div style={{ marginRight:'auto', position:'relative' }}>
          <Search size={15} style={{ position:'absolute', right:'0.75rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-light)' }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث..." dir="rtl"
            style={{ padding:'0.625rem 2.25rem 0.625rem 0.875rem', border:'1px solid var(--border)', borderRadius:'0.5rem', fontSize:'0.875rem', background:'var(--white)', outline:'none', width:'200px' }} />
        </div>
        <div style={{ display:'flex', border:'1px solid var(--border)', borderRadius:'0.5rem', overflow:'hidden' }}>
          {[{v:'grid',I:Grid},{v:'list',I:List}].map(({v,I}) => (
            <button key={v} onClick={() => setView(v as 'grid'|'list')}
              style={{ width:'2.25rem', height:'2.25rem', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', background:view===v?'var(--gold)':'var(--white)', color:view===v?'var(--white)':'var(--text-mid)', transition:'all 0.2s' }}>
              <I size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false) }}
        style={{ border:`2px dashed ${dragging?'var(--gold)':'var(--border)'}`, borderRadius:'1rem', padding:'2rem', textAlign:'center', marginBottom:'1.25rem', background:dragging?'rgba(201,168,76,0.04)':'transparent', transition:'all 0.2s', cursor:'default' }}>
        <p style={{ color:'var(--text-light)', fontSize:'0.875rem' }}>
          اسحب الصور وأفلتها هنا للرفع المباشر
        </p>
      </div>

      {/* Grid */}
      {view === 'grid' ? (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'1rem' }}>
          {filtered.map(m => (
            <div key={m.id} onClick={() => toggleSelect(m.id)}
              style={{ borderRadius:'0.75rem', overflow:'hidden', border:`2px solid ${selected.includes(m.id)?'var(--gold)':'var(--border-light)'}`, background:'var(--white)', cursor:'pointer', transition:'border-color 0.15s', position:'relative' }}>
              <div style={{ aspectRatio:'1', position:'relative', background:'var(--cream)' }}>
                <Image src={m.url} alt={m.name} fill className="object-cover" sizes="160px" />
                {selected.includes(m.id) && (
                  <div style={{ position:'absolute', inset:0, background:'rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:'1.75rem', height:'1.75rem', background:'var(--gold)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--white)', fontWeight:700 }}>✓</div>
                  </div>
                )}
              </div>
              <div style={{ padding:'0.5rem 0.625rem' }}>
                <p style={{ fontSize:'0.75rem', fontWeight:500, color:'var(--espresso)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{m.name}</p>
                <p style={{ fontSize:'0.7rem', color:'var(--text-light)' }}>{m.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-card" style={{ padding:0, overflow:'hidden' }}>
          <table className="data-table">
            <thead><tr><th>الصورة</th><th>الاسم</th><th>الحجم</th><th>التاريخ</th><th>إجراءات</th></tr></thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td style={{ width:'60px' }}>
                    <div style={{ width:'3rem', height:'3rem', borderRadius:'0.375rem', overflow:'hidden', position:'relative', background:'var(--cream)' }}>
                      <Image src={m.url} alt={m.name} fill className="object-cover" sizes="48px" />
                    </div>
                  </td>
                  <td style={{ fontWeight:500 }}>{m.name}</td>
                  <td style={{ color:'var(--text-light)', fontSize:'0.875rem' }}>{m.size}</td>
                  <td style={{ color:'var(--text-light)', fontSize:'0.8125rem' }}>{m.date}</td>
                  <td>
                    <div style={{ display:'flex', gap:'0.375rem' }}>
                      {[Copy, Trash2].map((Icon, i) => (
                        <button key={i} style={{ width:'2rem', height:'2rem', borderRadius:'0.375rem', border:'1px solid var(--border)', background:'var(--white)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-mid)' }}>
                          <Icon size={13} />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
