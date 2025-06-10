import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Sidebar, SidebarTab } from './Sidebar';
import { InputPage } from '../pages/InputPage';
import { ArtifactOutputPage } from '../pages/ArtifactOutputPage';
import { ArtifactJobsPage } from '../pages/ArtifactJobsPage';
import { UserActivityPage } from '../pages/UserActivityPage';
import { ProfilePage } from '../pages/ProfilePage';

export const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('input');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'input':
        return <InputPage />;
      case 'artifact-output':
        return <ArtifactOutputPage />;
      case 'artifact-jobs':
        return <ArtifactJobsPage />;
      case 'user-activity':
        return <UserActivityPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <InputPage />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopBar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />
        
        <main className={`flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-0' : 'ml-0'
        }`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};