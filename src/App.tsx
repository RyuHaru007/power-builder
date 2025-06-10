import React, { useState } from 'react';
import { useAuthStore } from './store/authStore';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { DashboardLayout } from './components/layout/DashboardLayout';

type AuthView = 'login' | 'register';

function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <DashboardLayout />;
  }

  return (
    <>
      {authView === 'login' ? (
        <LoginPage onRegisterClick={() => setAuthView('register')} />
      ) : (
        <RegisterPage onBackToLogin={() => setAuthView('login')} />
      )}
    </>
  );
}

export default App;