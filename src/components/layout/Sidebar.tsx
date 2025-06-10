import React from 'react';
import { 
  Upload, 
  Download, 
  Briefcase, 
  Activity, 
  User, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export type SidebarTab = 'input' | 'artifact-output' | 'artifact-jobs' | 'user-activity' | 'profile';

interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const sidebarItems = [
  { id: 'input' as SidebarTab, label: 'Input', icon: Upload },
  { id: 'artifact-output' as SidebarTab, label: 'Artifact Output', icon: Download },
  { id: 'artifact-jobs' as SidebarTab, label: 'Artifact Jobs', icon: Briefcase },
  { id: 'user-activity' as SidebarTab, label: 'User Activity', icon: Activity },
  { id: 'profile' as SidebarTab, label: 'Profile', icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  return (
    <div className={`bg-white shadow-sm border-r border-gray-200 h-full transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-gray-700">Menu</span>
              <X className="w-4 h-4" />
            </div>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center ${
                    isCollapsed ? 'justify-center px-3' : 'justify-between px-4'
                  } py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={`flex items-center ${isCollapsed ? '' : 'min-w-0'}`}>
                    <Icon className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'} flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${
                      isActive 
                        ? 'text-white/80 rotate-90' 
                        : 'text-gray-300 group-hover:text-gray-400'
                    }`} />
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};