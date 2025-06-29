import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/features/header';

export function App() {
  return (
    <div className="min-h-screen w-dvw  flex flex-col">
      <AppHeader />
      <Outlet />
    </div>
  );
}
