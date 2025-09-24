import React from 'react';

interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

const Dashboard: React.FC = () => {
  const modules: DashboardModule[] = [
    {
      id: 'orders',
      title: 'Objednávky',
      description: 'Správa objednávok a workflow',
      icon: '📋',
      path: '/orders'
    },
    {
      id: 'customers',
      title: 'Zákazníci',
      description: 'Databáza zákazníkov a kontaktov',
      icon: '👥',
      path: '/customers'
    },
    {
      id: 'products',
      title: 'Produkty',
      description: 'Katalóg produktov a služieb',
      icon: '📦',
      path: '/products'
    },
    {
      id: 'inventory',
      title: 'Sklad',
      description: 'Správa skladových zásob',
      icon: '🏪',
      path: '/inventory'
    }
  ];

  const handleModuleClick = (module: DashboardModule) => {
    console.log(`Navigating to: ${module.path}`);
  };

  return (
    <div>
      <header>
        <h1>L-KERN v2</h1>
        <p>ERP Systém - Dashboard</p>
      </header>

      <main>
        <div>
          {modules.map((module) => (
            <div key={module.id} onClick={() => handleModuleClick(module)}>
              <div>{module.icon}</div>
              <div>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2024 L-KERN v2 - Nová generácia ERP systému</p>
      </footer>
    </div>
  );
};

export default Dashboard;