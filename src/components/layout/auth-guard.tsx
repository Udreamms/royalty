
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // If loading has finished and there is no user, redirect to login page.
    // Avoid redirecting if we are already on a public page like /login.
    // NOTE: You should list all your public paths here.
    const publicPaths = ['/login', '/register']; 
    const isPublicPath = publicPaths.includes(pathname);

    if (!loading && !user && !isPublicPath) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  // Show loader while checking auth status or if a redirect is imminent
  if (loading || (!user && !['/login', '/register'].includes(pathname))) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Verificando acceso...</p>
      </div>
    );
  }

  // If the user is authenticated, or if we are on a public page, show the content.
  return <>{children}</>;
}
