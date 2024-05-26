import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

interface WithAuthProps {
  userRole: string;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & WithAuthProps>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
      const validateToken = async () => {
        const token = Cookies.get('token');
        if (!token) {
          router.push('/login');
          return;
        }

        try {
          const response = await axios.get('http://35.240.180.63:81/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserRole(response.data.role);
          setIsLoading(false);
        } catch (error) {
          router.push('/login');
        }
      };

      validateToken();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} userRole={userRole as string} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
