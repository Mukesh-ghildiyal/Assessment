// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { token } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/login');
      }
    }, [token, router]);

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default ProtectedRoute;
