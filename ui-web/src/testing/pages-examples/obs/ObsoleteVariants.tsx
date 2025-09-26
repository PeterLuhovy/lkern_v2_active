/**
 * Obsolete Design Variants
 * Archívne varianty Orders systému - pre historické účely a porovnanie
 */
import React, { useState } from 'react';
import OrdersVariant1 from './OrdersVariant1';
import OrdersVariant3 from './OrdersVariant3';
import OrdersVariant4 from './OrdersVariant4';
import OrdersVariant5 from './OrdersVariant5';
import OrdersVariant6 from './OrdersVariant6';
import OrdersVariant7 from './OrdersVariant7';
import OrdersVariant8 from './OrdersVariant8';
import OrdersVariant9 from './OrdersVariant9';

const ObsoleteVariants: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);

  const obsoleteVariants = [
    {
      id: 1,
      name: "Minimalist Space-Tech",
      description: "Tmavý futuristický dizajn pre space technológie",
      colors: ["#0a0a0a", "#00ffaa", "#0088ff", "#1a1a2e"],
      component: <OrdersVariant1 />,
      reason: "Príliš tmavý pre dlhodobú prácu"
    },
    {
      id: 3,
      name: "Military Grade",
      description: "Robustný vojenský dizajn pre obranný priemysel",
      colors: ["#1f2937", "#10b981", "#374151", "#4b5563"],
      component: <OrdersVariant3 />,
      reason: "Špecializované pre military sektor"
    },
    {
      id: 4,
      name: "Nuclear Energy",
      description: "Bezpečnostný dizajn pre jadrovú energetiku",
      colors: ["#1c1917", "#fbbf24", "#dc2626", "#292524"],
      component: <OrdersVariant4 />,
      reason: "Špecializované pre nuclear sektor"
    },
    {
      id: 5,
      name: "Corporate Premium",
      description: "Luxusný korporátny dizajn s brand farbami",
      colors: ["#ffffff", "#9c27b0", "#3366cc", "#f2f3f7"],
      component: <OrdersVariant5 />,
      reason: "Príliš luxusné pre výrobný priemysel"
    },
    {
      id: 6,
      name: "L-KERN Professional",
      description: "Profesionálny enterprise dizajn s L-KERN branding",
      colors: ["#222222", "#9c27b0", "#3366cc", "#f2f3f7"],
      component: <OrdersVariant6 />,
      reason: "Nahradené Variant 2 - Medical Industrial"
    },
    {
      id: 7,
      name: "Variant 7",
      description: "Dizajnový variant číslo 7",
      colors: ["#333333", "#666666", "#999999", "#cccccc"],
      component: <OrdersVariant7 />,
      reason: "Experimentálny variant - nedokončený"
    },
    {
      id: 8,
      name: "Variant 8",
      description: "Dizajnový variant číslo 8",
      colors: ["#444444", "#777777", "#aaaaaa", "#dddddd"],
      component: <OrdersVariant8 />,
      reason: "Experimentálny variant - nedokončený"
    },
    {
      id: 9,
      name: "L-KERN + StatusBar + Report",
      description: "Professional L-KERN s integrovaným StatusBar a ReportButton",
      colors: ["#222222", "#9c27b0", "#fd7e14", "#f2f3f7"],
      component: <OrdersVariant9 />,
      reason: "Funkcie integrované do Variant 2"
    }
  ];

  if (selectedVariant > 0) {
    const variant = obsoleteVariants.find(v => v.id === selectedVariant);
    return (
      <div>
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.8)',
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
            ← Späť
          </button>
          OBSOLETE: {variant?.name}
        </div>
        {variant ? variant.component : null}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
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
          background: '#ef4444',
          color: 'white',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          OBSOLETE VARIANTS
        </div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '16px'
        }}>
          Archívne Dizajny
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#64748b',
          fontWeight: '500',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          8 archívnych dizajnových variantov L-KERN Orders systému.
          Tieto varianty sú zachované pre historické účely a porovnanie.
          <br />
          <strong>Aktívny variant: Medical Industrial (Variant 2)</strong>
        </p>
      </div>

      {/* Obsolete Variants Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {obsoleteVariants.map((variant) => (
          <div
            key={variant.id}
            onClick={() => setSelectedVariant(variant.id)}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '2px solid #fecaca',
              opacity: '0.8'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.opacity = '0.8';
            }}
          >

            {/* Obsolete Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: '#ef4444',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              OBSOLETE
            </div>

            {/* Color Palette */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '24px'
            }}>
              {variant.colors.map((color, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: color,
                    border: color === '#ffffff' ? '2px solid #e2e8f0' : 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    opacity: '0.7'
                  }}
                ></div>
              ))}
            </div>

            {/* Variant Info */}
            <div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '12px'
              }}>
                {variant.name}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#64748b',
                fontWeight: '500',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                {variant.description}
              </p>

              {/* Obsolete Reason */}
              <div style={{
                padding: '12px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#dc2626',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>
                  DÔVOD ARCHIVOVANI:
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#991b1b',
                  fontWeight: '500'
                }}>
                  {variant.reason}
                </div>
              </div>

              {/* Action Button */}
              <button style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                View Obsolete {variant.name} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '80px',
        padding: '32px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid #fecaca'
      }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#dc2626',
          marginBottom: '16px'
        }}>
          ⚠️ Archived Design Variants
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Tieto dizajnové varianty boli archivované z rôznych dôvodov (špecializácia, komplexnosť, UX problémy).
          Zostávajú dostupné pre historické účely a porovnanie s aktívnym Variant 2.
        </p>
        <div style={{
          marginTop: '20px',
          padding: '12px 20px',
          background: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          display: 'inline-block'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#166534',
            fontWeight: '600'
          }}>
            ✅ Aktívny variant: Medical Industrial (Variant 2)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ObsoleteVariants;