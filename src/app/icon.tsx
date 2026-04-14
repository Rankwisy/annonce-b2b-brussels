import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#a04100',
          borderRadius: '6px',
          fontFamily: 'sans-serif',
          fontWeight: 900,
          fontSize: 20,
          color: 'white',
          letterSpacing: '-1px',
        }}
      >
        A
      </div>
    ),
    { ...size }
  )
}
