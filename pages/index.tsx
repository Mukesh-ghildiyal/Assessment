// pages/index.tsx
import ProtectedRoute from '../components/ProtectedRoute';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Welcome to the protected home page!</h1>
    </div>
  );
};

export default ProtectedRoute(HomePage);
