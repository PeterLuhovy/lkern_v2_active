import './App.css'
import { useState } from 'react'
import OrdersVariant1 from './testing/design-examples/OrdersVariant1'
import OrdersVariant2 from './testing/design-examples/OrdersVariant2'
import OrdersVariant3 from './testing/design-examples/OrdersVariant3'
import OrdersVariant4 from './testing/design-examples/OrdersVariant4'
import OrdersVariant5 from './testing/design-examples/OrdersVariant5'
import OrdersVariant6 from './testing/design-examples/OrdersVariant6'
import OrdersVariant7 from './testing/design-examples/OrdersVariant7'
import OrdersVariant8 from './testing/design-examples/OrdersVariant8'
import OrdersVariant9 from './testing/design-examples/OrdersVariant9'
import TestCustomerInquiries from './testing/customer-inquiries/TestCustomerInquiries'

function App() {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<number>(0);

  // ERP Sections - hlavné sekcie systému
  const erpSections = [
    {
      id: 'dashboard',
      name: '📊 Dashboard',
      description: 'Prehľad systému a štatistiky',
      status: 'V PRÍPRAVE',
      color: '#3366cc'
    },
    {
      id: 'orders',
      name: '📋 Orders',
      description: 'Správa objednávek',
      status: 'V PRÍPRAVE',
      color: '#9c27b0'
    },
    {
      id: 'customers',
      name: '👥 Customers',
      description: 'Správa zákazníkov',
      status: 'V PRÍPRAVE',
      color: '#4CAF50'
    },
    {
      id: 'parts',
      name: '⚙️ Parts',
      description: 'Katalóg súčiastok',
      status: 'V PRÍPRAVE',
      color: '#FF9800'
    },
    {
      id: 'packing',
      name: '📦 Packing',
      description: 'Balenie a expedícia',
      status: 'V PRÍPRAVE',
      color: '#607D8B'
    },
    {
      id: 'delivery',
      name: '🚚 Delivery',
      description: 'Doručenie a logistika',
      status: 'V PRÍPRAVE',
      color: '#795548'
    },
    {
      id: 'invoices',
      name: '💰 Invoices',
      description: 'Fakturácia a platby',
      status: 'V PRÍPRAVE',
      color: '#F44336'
    },
    {
      id: 'testing',
      name: '🧪 Testing',
      description: 'Testovacia sekcia a prototypy',
      status: 'AKTÍVNE',
      color: '#E91E63'
    }
  ];

  // Testing variants - len pre testing sekciu
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
      description: "Technický dizajn inšpirovaný systémom v1 a L-KERN brand",
      colors: ["#9c27b0", "#3366cc", "#f2f3f7", "#2a2a2a"],
      component: <OrdersVariant6 />
    },
    {
      id: 7,
      name: "Dark Professional Pro",
      description: "Tmavý profesionálny dizajn s logami a advanced filtering",
      colors: ["#1c1c2e", "#26263a", "#9c27b0", "#3366cc"],
      component: <OrdersVariant7 />
    },
    {
      id: 8,
      name: "Perfect Fusion",
      description: "Funkcionalita v7 s kompletným dizajnom a farbami v6",
      colors: ["#f2f3f7", "#ffffff", "#9c27b0", "#3366cc"],
      component: <OrdersVariant8 />
    },
    {
      id: 9,
      name: "L-KERN + StatusBar + Report",
      description: "Professional L-KERN s integrovaným StatusBar a ReportButton",
      colors: ["#222222", "#9c27b0", "#fd7e14", "#f2f3f7"],
      component: <OrdersVariant9 />
    },
    {
      id: 10,
      name: "🧪 Customer Inquiries Testing",
      description: "Testovacia stránka pre modal spracovania dopytov zákazníkov",
      colors: ["#f2f3f7", "#9c27b0", "#3366cc", "#ffffff"],
      component: <TestCustomerInquiries />
    }
  ];

  // Ak je vybraný variant v testing sekcii
  if (selectedVariant > 0) {
    const variant = variants.find(v => v.id === selectedVariant);
    return (
      <div>
        <button
          onClick={() => {
            setSelectedVariant(0);
            setSelectedSection('testing');
          }}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 9999,
            padding: '10px 20px',
            background: '#9c27b0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← Späť na Testing
        </button>
        {variant ? variant.component : null}
      </div>
    );
  }

  // Ak je vybraná testing sekcia - zobraz testing varianty
  if (selectedSection === 'testing') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '20px',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
      }}>
        {/* Testing Header s Back button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => setSelectedSection('')}
            style={{
              padding: '8px 16px',
              background: '#6B7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginRight: '16px'
            }}
          >
            ← Späť na Dashboard
          </button>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #E91E63 0%, #9c27b0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              margin: 0
            }}>
              🧪 Testing Hub
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              fontWeight: '500',
              margin: 0
            }}>
              Dizajnové príklady a experimentálne komponenty
            </p>
          </div>
        </div>

        {/* Testing Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
          maxWidth: '1200px'
        }}>
          {variants.map((variant) => (
            <div
              key={variant.id}
              onClick={() => setSelectedVariant(variant.id)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Color Palette */}
              <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '12px'
              }}>
                {variant.colors.slice(0, 3).map((color, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      background: color,
                      border: color === '#ffffff' ? '1px solid #e2e8f0' : 'none',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                  ></div>
                ))}
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '6px',
                  lineHeight: '1.3'
                }}>
                  {variant.name}
                </h3>
                <p style={{
                  fontSize: '11px',
                  color: '#64748b',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  marginBottom: '12px',
                  flex: 1
                }}>
                  {variant.description}
                </p>

                <button style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'linear-gradient(135deg, #E91E63 0%, #9c27b0 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginTop: 'auto'
                }}>
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Hlavný dashboard s ERP sekciami
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '20px',
      fontFamily: "'Inter', 'Segoe UI', sans-serif"
    }}>

      {/* Main Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #9c27b0 0%, #3366cc 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '12px'
        }}>
          L-KERN ERP System
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#64748b',
          fontWeight: '500',
          margin: '0'
        }}>
          Professional Manufacturing Enterprise Resource Planning
        </p>
      </div>

      {/* ERP Sections Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {erpSections.map((section) => (
          <div
            key={section.id}
            onClick={() => {
              if (section.id === 'testing') {
                setSelectedSection('testing');
              } else {
                alert(`${section.name} - ${section.status}`);
              }
            }}
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              cursor: section.id === 'testing' ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${section.id === 'testing' ? section.color : '#e2e8f0'}`,
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              opacity: section.id === 'testing' ? 1 : 0.7
            }}
            onMouseEnter={(e) => {
              if (section.id === 'testing') {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = section.color;
              }
            }}
            onMouseLeave={(e) => {
              if (section.id === 'testing') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
              }
            }}
          >

            {/* Section Icon a Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${section.color}20, ${section.color}40)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                marginRight: '12px',
                border: `2px solid ${section.color}30`
              }}>
                {section.name.split(' ')[0]}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1e293b',
                  margin: 0,
                  lineHeight: '1.2'
                }}>
                  {section.name.substring(2)}
                </h3>
                <div style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: section.status === 'AKTÍVNE' ? '#059669' : '#f59e0b',
                  background: section.status === 'AKTÍVNE' ? '#d1fae520' : '#fef3c720',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  marginTop: '4px',
                  border: `1px solid ${section.status === 'AKTÍVNE' ? '#d1fae5' : '#fef3c7'}`
                }}>
                  {section.status}
                </div>
              </div>
            </div>

            {/* Section Description */}
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              fontWeight: '500',
              lineHeight: '1.5',
              margin: '0 0 20px 0',
              flex: 1
            }}>
              {section.description}
            </p>

            {/* Action Info */}
            {section.id === 'testing' ? (
              <div style={{
                padding: '12px',
                background: `${section.color}10`,
                borderRadius: '8px',
                border: `1px solid ${section.color}30`,
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: section.color
                }}>
                  ✨ Klikni pre vstup →
                </div>
              </div>
            ) : (
              <div style={{
                padding: '12px',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#94a3b8'
                }}>
                  🚧 V príprave
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* System Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '16px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.5)'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#64748b',
          marginBottom: '8px'
        }}>
          L-KERN Manufacturing ERP • Version 2.0 • Development Phase
        </div>
        <div style={{
          fontSize: '12px',
          color: '#94a3b8'
        }}>
          Professional Manufacturing Solutions by Luhovy Industries
        </div>
      </div>
    </div>
  );
}

export default App
