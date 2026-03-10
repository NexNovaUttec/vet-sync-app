import { QRCodeSVG } from 'qrcode.react'

// Logo SVG inline para que funcione con html2canvas
const VetLogo = () => (
  <svg style={{ height: '48px', width: '48px' }} viewBox="0 0 100 100" fill="none">
    {/* Círculo de fondo */}
    <circle cx="50" cy="50" r="48" fill="#1f2937" />
    
    {/* Huella de mascota estilizada */}
    <g transform="translate(50, 50)">
      {/* Almohadilla principal */}
      <ellipse cx="0" cy="8" rx="12" ry="15" fill="white" />
      
      {/* Dedos superiores */}
      <ellipse cx="-10" cy="-8" rx="6" ry="8" fill="white" transform="rotate(-15 -10 -8)" />
      <ellipse cx="-3" cy="-12" rx="6" ry="8" fill="white" transform="rotate(-5 -3 -12)" />
      <ellipse cx="4" cy="-12" rx="6" ry="8" fill="white" transform="rotate(5 4 -12)" />
      <ellipse cx="11" cy="-8" rx="6" ry="8" fill="white" transform="rotate(15 11 -8)" />
    </g>
  </svg>
)

export function PetCarnet({ pet, owner }) {
  // Generar URL única para el QR (puede ser una URL a un perfil de la mascota)
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
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
          boxSizing: 'border-box'
        }}
      >
      {/* Decoraciones de fondo */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(146, 64, 14, 0.8)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '16px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'rgba(234, 88, 12, 0.6)'
        }}
      />
      <div style={{ position: 'absolute', bottom: '64px', right: '80px', width: '96px', height: '96px', opacity: 0.1 }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#92400e" strokeWidth="2" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#92400e" strokeWidth="2" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#92400e" strokeWidth="2" />
        </svg>
      </div>

      {/* Lado Izquierdo - Marrón con info de mascota */}
      <div
        style={{
          width: '350px',
          background: 'linear-gradient(to bottom right, #7c2d12, #c2410c, #92400e)',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decoraciones */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '160px',
            height: '160px',
            border: '4px solid rgba(194, 65, 12, 0.3)',
            borderRadius: '50%'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-40px',
            width: '240px',
            height: '240px',
            border: '4px solid rgba(194, 65, 12, 0.3)',
            borderRadius: '50%'
          }}
        />

        {/* Íconos decorativos */}
        <div style={{ position: 'absolute', top: '48px', left: '24px', color: '#ef4444', opacity: 0.8 }}>
          <svg style={{ width: '48px', height: '48px' }} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: '96px', left: '32px', color: '#fde68a', opacity: 0.6 }}>
          <svg style={{ width: '40px', height: '40px' }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        </div>

        {/* Huellas decorativas */}
        <div style={{ position: 'absolute', top: '128px', right: '24px', opacity: 0.4 }}>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'flex-end',
              transform: 'rotate(12deg)'
            }}
          >
            <div style={{ width: '12px', height: '16px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div style={{ width: '12px', height: '16px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div style={{ width: '12px', height: '16px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div style={{ width: '12px', height: '16px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div
              style={{ width: '16px', height: '24px', backgroundColor: '#fcd34d', borderRadius: '50%', marginTop: '8px' }}
            />
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '192px', right: '32px', opacity: 0.4 }}>
          <div
            style={{
              display: 'flex',
              gap: '4px',
              alignItems: 'flex-end',
              transform: 'rotate(-12deg)'
            }}
          >
            <div style={{ width: '8px', height: '12px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div style={{ width: '8px', height: '12px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div style={{ width: '8px', height: '12px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div style={{ width: '8px', height: '12px', backgroundColor: '#fcd34d', borderRadius: '50%' }} />
            <div
              style={{ width: '12px', height: '20px', backgroundColor: '#fcd34d', borderRadius: '50%', marginTop: '4px' }}
            />
          </div>
        </div>

        {/* Logo pequeño arriba */}
        <div style={{ zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '4px'
            }}
          >
            <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" fill="#c2410c" />
              <g transform="translate(50, 50)">
                <ellipse cx="0" cy="8" rx="12" ry="15" fill="white" />
                <ellipse cx="-10" cy="-8" rx="6" ry="8" fill="white" transform="rotate(-15 -10 -8)" />
                <ellipse cx="-3" cy="-12" rx="6" ry="8" fill="white" transform="rotate(-5 -3 -12)" />
                <ellipse cx="4" cy="-12" rx="6" ry="8" fill="white" transform="rotate(5 4 -12)" />
                <ellipse cx="11" cy="-8" rx="6" ry="8" fill="white" transform="rotate(15 11 -8)" />
              </g>
            </svg>
          </div>
          <span style={{ color: '#fef3c7', fontWeight: 'bold', fontSize: '14px', letterSpacing: '0.05em' }}>
            Vet Sync
          </span>
        </div>

        {/* Foto de la mascota - Circular grande */}
        <div
          style={{
            width: '208px',
            height: '208px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '8px solid white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            zIndex: 10,
            backgroundColor: 'white'
          }}
        >
          <img
            src={pet.img_url || 'https://via.placeholder.com/300x300?text=Sin+Foto'}
            alt={pet.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Nombre y raza de la mascota */}
        <div style={{ textAlign: 'center', zIndex: 10, marginTop: '16px' }}>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: '900',
              color: 'white',
              marginBottom: '8px',
              textShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
              letterSpacing: '0.05em'
            }}
          >
            {pet.nombre}
          </h2>
          <p style={{ fontSize: '20px', fontWeight: '600', color: '#fef3c7', letterSpacing: '0.05em' }}>
            {pet.nombre_raza}
          </p>
        </div>

        {/* Fecha de registro */}
        <div
          style={{
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            padding: '12px 24px',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <p
            style={{
              fontSize: '10px',
              color: '#7c2d12',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}
          >
            Registration Date:
          </p>
          <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#9a3412' }}>
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
          backgroundColor: 'white',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Logo y nombre de la veterinaria */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <VetSyncLogo />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#7c2d12', letterSpacing: '-0.025em' }}>
              Vet Sync
            </h1>
            <p style={{ fontSize: '12px', color: '#c2410c', fontStyle: 'italic' }}>Lorem ipsum dolor sit amet</p>
          </div>
        </div>

        {/* Información del Propietario */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ fontSize: '20px', fontWeight: '900', color: '#7c2d12', marginBottom: '16px', letterSpacing: '0.05em' }}
          >
            INFORMACIÓN DEL PROPIETARIO
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Nombre:{' '}
                <span style={{ fontWeight: 'normal', color: '#1f2937' }}>
                  {owner?.nombre} {owner?.apellido}
                </span>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Dirección:{' '}
                <span style={{ fontWeight: 'normal', color: '#1f2937' }}>
                  {owner?.direccion || 'Calle Falsa 123, Ciudad de Ejemplo'}
                </span>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Teléfono:{' '}
                <span style={{ fontWeight: 'normal', color: '#1f2937' }}>{owner?.telefono || '+52 555-0123'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Detalle Adicional de la Mascota */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{ fontSize: '20px', fontWeight: '900', color: '#7c2d12', marginBottom: '16px', letterSpacing: '0.05em' }}
          >
            DETALLE ADICIONAL DE LA MASCOTA
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Raza: <span style={{ fontWeight: 'normal', color: '#1f2937' }}>{pet.nombre_raza}</span>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Sexo:{' '}
                <span style={{ fontWeight: 'normal', color: '#1f2937' }}>
                  {pet.sexo === 'M' ? 'Macho (C)' : 'Hembra (C)'}
                </span>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Edad: <span style={{ fontWeight: 'normal', color: '#1f2937' }}>{pet.edad} años</span>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#7c2d12', fontWeight: 'bold' }}>
                Color: <span style={{ fontWeight: 'normal', color: '#1f2937' }}>Negro y Blanco</span>
              </p>
            </div>
          </div>
        </div>

        {/* Código QR */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '12px',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: '4px solid #9a3412'
            }}
          >
            <QRCodeSVG value={qrValue} size={120} level="H" includeMargin={false} />
          </div>
        </div>

        {/* Decoración corazón abajo */}
        <div style={{ position: 'absolute', bottom: '32px', right: '40px', color: '#ef4444', opacity: 0.7 }}>
          <svg style={{ width: '56px', height: '56px' }} fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    </div>
  )
}
