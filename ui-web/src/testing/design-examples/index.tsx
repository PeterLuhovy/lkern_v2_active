/**
 * L-KERN Testing Dashboard
 * Aktívny dizajn: Medical Industrial (Variant 2)
 */
import React, { useState } from 'react';
import OrdersVariant2 from './OrdersVariant2';
import ObsoleteVariants from './obs/ObsoleteVariants';

const DesignVariants: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<number>(2);
  const [showObsolete, setShowObsolete] = useState<boolean>(false);

  // Active variant only
  const activeVariant = {
    id: 2,
    name: "Medical Industrial",
    description: "Čistý medicínsky dizajn s bezpečnostnými štandardmi - FINÁLNY VARIANT",
    colors: ["#ffffff", "#3182ce", "#38a169", "#f7fafc"],
    component: <OrdersVariant2 />,
    status: "ACTIVE"
  };

  if (showObsolete) {
    return <ObsoleteVariants />;
  }

  if (selectedVariant === 2) {
    return (
      <div>
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'rgba(56, 161, 105, 0.9)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          <button
            onClick={() => setSelectedVariant(0)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              marginRight: '10px',
              fontSize: '16px'
            }}
          >
            ← Dashboard
          </button>
          AKTÍVNY: {activeVariant.name}
        </div>
        {activeVariant.component}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
      padding: '40px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 16px',
          background: '#16a34a',
          color: 'white',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          PRODUCTION READY
        </div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '16px'
        }}>
          L-KERN Testing Dashboard
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#64748b',
          fontWeight: '500',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          Finálny dizajnový variant Orders systému pre produkčné nasadenie.
          <br />
          <strong>Medical Industrial (Variant 2)</strong> - optimalizovaný pre výrobný priemysel.
        </p>
      </div>

      {/* Active Variant Card */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 40px auto',
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '3px solid #22c55e'
      }}>

        {/* Active Badge */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <div style={{
            background: '#22c55e',
            color: 'white',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '700'
          }}>
            ✅ ACTIVE VARIANT
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#15803d'
          }}>
            Variant #{activeVariant.id}
          </div>
        </div>

        {/* Color Palette */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          justifyContent: 'center'
        }}>
          {activeVariant.colors.map((color, idx) => (
            <div
              key={idx}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: color,
                border: color === '#ffffff' ? '3px solid #e2e8f0' : 'none',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
              }}
            ></div>
          ))}
        </div>

        {/* Variant Info */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#1e293b',
            marginBottom: '16px'
          }}>
            {activeVariant.name}
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            fontWeight: '500',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}>
            {activeVariant.description}
          </p>

          {/* Features */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {[
              'Production Ready',
              'Medical Standards',
              'Clean Design',
              'High Performance',
              'Professional UX'
            ].map((feature, idx) => (
              <span
                key={idx}
                style={{
                  padding: '8px 16px',
                  background: '#dcfce7',
                  color: '#15803d',
                  border: '1px solid #bbf7d0',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={() => setSelectedVariant(2)}
            style={{
              padding: '20px 40px',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginRight: '20px'
            }}
          >
            🚀 Launch {activeVariant.name}
          </button>

          <button
            onClick={() => setShowObsolete(true)}
            style={{
              padding: '20px 40px',
              background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📁 View Obsolete Variants
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '32px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid #bbf7d0'
      }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#15803d',
          marginBottom: '16px'
        }}>
          🏭 Ready for Production Deployment
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Medical Industrial variant bol vybraný ako finálny dizajn pre L-KERN Orders systém.
          Optimalizovaný pre výrobný priemysel s dôrazom na čistotu, bezpečnosť a profesionalitu.
        </p>
      </div>
    </div>
  );
};

export default DesignVariants;