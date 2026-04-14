import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #a04100 0%, #7a3100 100%)',
          borderRadius: '40px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontWeight: 900,
              fontSize: 90,
              color: 'white',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            A
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '2px',
              marginTop: '-8px',
            }}
          >
            .brussels
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
