import { QRCodeSVG } from 'qrcode.react'

// Logo SVG inline para que funcione con html2canvas
const VetLogo = () => (
  <svg style={{ height: '48px', width: '48px' }} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#1f2937" />
    <g transform="translate(50, 50)">
      <ellipse cx="0" cy="8" rx="12" ry="15" fill="white" />
      <ellipse cx="-10" cy="-8" rx="6" ry="8" fill="white" transform="rotate(-15 -10 -8)" />
      <ellipse cx="-3" cy="-12" rx="6" ry="8" fill="white" transform="rotate(-5 -3 -12)" />
      <ellipse cx="4" cy="-12" rx="6" ry="8" fill="white" transform="rotate(5 4 -12)" />
      <ellipse cx="11" cy="-8" rx="6" ry="8" fill="white" transform="rotate(15 11 -8)" />
    </g>
  </svg>
)

export function PetCarnet({ pet, owner }) {
  const qrValue = `https://vetsync.com/pet/${pet.id}`

  return (
    <div
      style={{
        all: 'initial',
        display: 'block',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 'normal',
        boxSizing: 'border-box'
      }}
    >
      <div
        id="pet-carnet"
        style={{
          width: '875px',
          height: '525px',
          background: '#f97316',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
          boxSizing: 'border-box'
        }}
      >
        {/* Decoraciones de fondo generales */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '-60px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            opacity: 0.15
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '80px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            opacity: 0.1
          }}
        />

        {/* Lado Izquierdo - Marrón con info de mascota */}
        <div
          style={{
            width: '380px',
            background: 'linear-gradient(180deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px 0 0 16px'
          }}
        >
          {/* Decoración de onda superior */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: '-1px',
              width: '100px',
              height: '200px',
              background: '#f97316',
              borderRadius: '0 0 0 100%',
              opacity: 0.3
            }}
          />

          {/* Decoración de onda inferior */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)',
              borderRadius: '0'
            }}
          />

          {/* Decoraciones de huellas */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', opacity: 0.3 }}>
            <svg style={{ width: '40px', height: '40px', fill: '#fbbf24' }} viewBox="0 0 24 24">
              <circle cx="12" cy="16" r="3" />
              <circle cx="7" cy="12" r="2" />
              <circle cx="10" cy="9" r="2" />
              <circle cx="14" cy="9" r="2" />
              <circle cx="17" cy="12" r="2" />
            </svg>
          </div>
          <div style={{ position: 'absolute', bottom: '80px', right: '30px', opacity: 0.3 }}>
            <svg style={{ width: '35px', height: '35px', fill: '#fbbf24' }} viewBox="0 0 24 24">
              <circle cx="12" cy="16" r="3" />
              <circle cx="7" cy="12" r="2" />
              <circle cx="10" cy="9" r="2" />
              <circle cx="14" cy="9" r="2" />
              <circle cx="17" cy="12" r="2" />
            </svg>
          </div>
          <div style={{ position: 'absolute', bottom: '140px', left: '40px', opacity: 0.3 }}>
            <svg style={{ width: '30px', height: '30px', fill: '#fbbf24' }} viewBox="0 0 24 24">
              <circle cx="12" cy="16" r="3" />
              <circle cx="7" cy="12" r="2" />
              <circle cx="10" cy="9" r="2" />
              <circle cx="14" cy="9" r="2" />
              <circle cx="17" cy="12" r="2" />
            </svg>
          </div>

          {/* Decoraciones corazones */}
          <div style={{ position: 'absolute', top: '30px', left: '30px', opacity: 0.6 }}>
            <svg style={{ width: '50px', height: '50px', fill: '#ef4444' }} viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Decoración hueso */}
          <div style={{ position: 'absolute', top: '120px', left: '25px', opacity: 0.4 }}>
            <svg style={{ width: '60px', height: '30px', fill: '#d1d5db' }} viewBox="0 0 60 30">
              <circle cx="10" cy="15" r="8" />
              <circle cx="50" cy="15" r="8" />
              <rect x="10" y="12" width="40" height="6" />
            </svg>
          </div>

          {/* Contenedor de foto con borde */}
          <div
            style={{
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '10px solid #f5f5f5',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              zIndex: 10,
              backgroundColor: '#f5f5f5',
              marginTop: '35px',
              marginBottom: '20px'
            }}
          >
            <img
              src={pet.img_url || 'https://via.placeholder.com/300x300?text=Sin+Foto'}
              alt={pet.nombre}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center'
              }}
            />
          </div>

          {/* Nombre de la mascota */}
          <div style={{ textAlign: 'center', zIndex: 10, width: '100%', padding: '0 30px' }}>
            <h2
              style={{
                fontSize: '52px',
                fontWeight: '900',
                color: 'white',
                marginBottom: '6px',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.02em',
                lineHeight: '1',
                margin: '0 0 6px 0'
              }}
            >
              {pet.nombre}
            </h2>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#fef3c7',
                letterSpacing: '0.05em',
                marginBottom: '20px',
                margin: '0 0 20px 0'
              }}
            >
              {pet.nombre_raza}
            </p>
          </div>

          {/* Fecha de registro */}
          <div
            style={{
              zIndex: 10,
              textAlign: 'center',
              color: 'white',
              marginBottom: '20px'
            }}
          >
            <p
              style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '3px',
                opacity: 0.9,
                margin: '0 0 3px 0'
              }}
            >
              Registration Date:
            </p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
              {new Date(pet.fecha_registro).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Lado Derecho - Blanco con info del propietario */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            padding: '30px 35px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 16px 16px 0'
          }}
        >
          {/* Decoraciones geométricas en el fondo */}
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '-60px',
              width: '200px',
              height: '200px',
              opacity: 0.08
            }}
          >
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
              <circle cx="100" cy="100" r="90" fill="none" stroke="#f97316" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#f97316" strokeWidth="2" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#f97316" strokeWidth="2" />
              <line x1="100" y1="100" x2="190" y2="100" stroke="#f97316" strokeWidth="2" />
              <line x1="100" y1="100" x2="170" y2="30" stroke="#f97316" strokeWidth="2" />
              <line x1="100" y1="100" x2="100" y2="10" stroke="#f97316" strokeWidth="2" />
              <line x1="100" y1="100" x2="30" y2="30" stroke="#f97316" strokeWidth="2" />
            </svg>
          </div>

          {/* Decoración semicírculo superior */}
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '20px solid #f97316',
              opacity: 0.1
            }}
          />

          {/* Logo y nombre de la veterinaria */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '22px', zIndex: 5 }}>
            <VetLogo />
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1f2937', letterSpacing: '-0.02em', margin: 0 }}>
                VetSync
              </h1>
            </div>
          </div>

          {/* Información del Propietario */}
          <div style={{ marginBottom: '16px', zIndex: 5, textAlign: 'center' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#f97316',
                marginBottom: '10px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: '0 0 10px 0',
                lineHeight: '1.3'
              }}
            >
              INFORMACIÓN DEL<br />PROPIETARIO
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                  <strong style={{ fontWeight: '700' }}>Nombre:</strong>{' '}
                  {owner?.nombre} {owner?.apellido}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                  <strong style={{ fontWeight: '700' }}>Dirección:</strong>{' '}
                  {owner?.direccion || 'Calle Falsa 123, Ciudad de Ejemplo'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                  <strong style={{ fontWeight: '700' }}>Teléfono:</strong> {owner?.telefono || '+52 555-0123'}
                </p>
              </div>
            </div>
          </div>

          {/* Detalle Adicional de la Mascota */}
          <div style={{ marginBottom: '16px', zIndex: 5, textAlign: 'center' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#f97316',
                marginBottom: '10px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: '0 0 10px 0',
                lineHeight: '1.3'
              }}
            >
              DETALLE ADICIONAL<br />DE LA MASCOTA
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                  <strong style={{ fontWeight: '700' }}>Raza:</strong> {pet.nombre_raza}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                  <strong style={{ fontWeight: '700' }}>Sexo:</strong>{' '}
                  {pet.sexo === 'M' ? 'Macho (C)' : 'Hembra (C)'}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#1f2937', margin: 0, lineHeight: '1.4' }}>
                  <strong style={{ fontWeight: '700' }}>Edad:</strong> {pet.edad} años
                </p>
              </div>
            </div>
          </div>

          {/* Código QR */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 5, marginTop: 'auto', paddingTop: '10px', paddingBottom: '25px' }}>
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '4px solid #f97316',
                display: 'inline-block'
              }}
            >
              <QRCodeSVG value={qrValue} size={125} level="H" includeMargin={false} fgColor="#f97316" />
            </div>
          </div>

          {/* Decoración corazón abajo */}
          <div style={{ position: 'absolute', bottom: '20px', right: '30px', color: '#ef4444', opacity: 0.6, zIndex: 5 }}>
            <svg style={{ width: '50px', height: '50px' }} fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Decoración hueso pequeño */}
          <div style={{ position: 'absolute', bottom: '200px', right: '40px', opacity: 0.15, zIndex: 1 }}>
            <svg style={{ width: '80px', height: '40px', fill: '#f97316' }} viewBox="0 0 60 30">
              <circle cx="10" cy="15" r="8" />
              <circle cx="50" cy="15" r="8" />
              <rect x="10" y="12" width="40" height="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
