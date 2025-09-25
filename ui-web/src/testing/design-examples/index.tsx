/**
 * Design Variants Index
 * Showcase pre všetkých 9 dizajnových variantov L-KERN Orders systému
 */
import React, { useState } from 'react';
import OrdersVariant1 from './OrdersVariant1';
import OrdersVariant2 from './OrdersVariant2';
import OrdersVariant3 from './OrdersVariant3';
import OrdersVariant4 from './OrdersVariant4';
import OrdersVariant5 from './OrdersVariant5';
import OrdersVariant6 from './OrdersVariant6';
import OrdersVariant7 from './OrdersVariant7';
import OrdersVariant8 from './OrdersVariant8';
import OrdersVariant9 from './OrdersVariant9';

const DesignVariants: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<number>(1);

  const variants = [
    {
      id: 1,
      name: "Minimalist Space-Tech",
      description: "Tmavý futuristický dizajn pre space technológie",
      colors: ["#0a0a0a", "#00ffaa", "#0088ff", "#1a1a2e"],
      component: <OrdersVariant1 />
    },
    {
      id: 2,
      name: "Medical Industrial",
      description: "Čistý medicínsky dizajn s bezpečnostnými štandardmi",
      colors: ["#ffffff", "#3182ce", "#38a169", "#f7fafc"],
      component: <OrdersVariant2 />
    },
    {
      id: 3,
      name: "Military Grade",
      description: "Robustný vojenský dizajn pre obranný priemysel",
      colors: ["#1f2937", "#10b981", "#374151", "#4b5563"],
      component: <OrdersVariant3 />
    },
    {
      id: 4,
      name: "Nuclear Energy",
      description: "Bezpečnostný dizajn pre jadrovú energetiku",
      colors: ["#1c1917", "#fbbf24", "#dc2626", "#292524"],
      component: <OrdersVariant4 />
    },
    {
      id: 5,
      name: "Corporate Premium",
      description: "Luxusný korporátny dizajn s brand farbami",
      colors: ["#ffffff", "#9c27b0", "#3366cc", "#f2f3f7"],
      component: <OrdersVariant5 />
    },
    {
      id: 6,
      name: "L-KERN Professional",
      description: "Profesionálny enterprise dizajn s L-KERN branding",
      colors: ["#222222", "#9c27b0", "#3366cc", "#f2f3f7"],
      component: <OrdersVariant6 />
    },
    {
      id: 7,
      name: "Variant 7",
      description: "Dizajnový variant číslo 7",
      colors: ["#333333", "#666666", "#999999", "#cccccc"],
      component: <OrdersVariant7 />
    },
    {
      id: 8,
      name: "Variant 8",
      description: "Dizajnový variant číslo 8",
      colors: ["#444444", "#777777", "#aaaaaa", "#dddddd"],
      component: <OrdersVariant8 />
    },
    {
      id: 9,
      name: "L-KERN + StatusBar + Report",
      description: "Professional L-KERN s integrovaným StatusBar a ReportButton",
      colors: ["#222222", "#9c27b0", "#fd7e14", "#f2f3f7"],
      component: <OrdersVariant9 />
    }
  ];

  if (selectedVariant > 0) {
    const variant = variants.find(v => v.id === selectedVariant);
    return variant ? variant.component : null;
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
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #9c27b0 0%, #3366cc 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '16px'
        }}>
          L-KERN Design Variants
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#64748b',
          fontWeight: '500',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          9 profesionálnych dizajnov pre Orders systém zameraných na rôzne odvetvia:
          Space, Medical, Military, Nuclear, Corporate a L-KERN Enterprise riešenia
        </p>
      </div>

      {/* Variants Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {variants.map((variant) => (
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
              border: '1px solid #e2e8f0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >

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
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
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
                marginBottom: '24px'
              }}>
                {variant.description}
              </p>

              {/* Features */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '24px'
              }}>
                {[
                  'Responsive Design',
                  'Dark/Light Theme',
                  'Interactive Tables',
                  'Modern UI'
                ].map((feature, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '6px 12px',
                      background: '#f1f5f9',
                      color: '#475569',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                View {variant.name} →
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
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Professional ERP Solutions
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Each design variant is optimized for specific industries with unique color schemes,
          typography, and user experience patterns that match industry standards and expectations.
        </p>
      </div>
    </div>
  );
};

export default DesignVariants;