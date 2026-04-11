import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Annonce.brussels — L\'Annuaire B2B de Bruxelles'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d1c2e 0%, #1a3550 55%, #a04100 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ color: '#ffb693', fontSize: 18, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', marginBottom: 28 }}>
          Annuaire B2B · Bruxelles, Belgique
        </div>
        <div style={{ color: 'white', fontSize: 76, fontWeight: 900, lineHeight: 1.05, marginBottom: 32, display: 'flex' }}>
          Annonce<span style={{ color: '#ff6b00' }}>.brussels</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: 28, maxWidth: 720, lineHeight: 1.4 }}>
          2 400+ entreprises B2B vérifiées · 12 secteurs · 19 communes
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 16 }}>
          {['Construction', 'Finance', 'Tech', 'Horeca', 'Immobilier'].map(tag => (
            <div key={tag} style={{ background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 15, fontWeight: 600, padding: '8px 20px', borderRadius: 999 }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
