"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/icons/logo";
import { Mail, Lock, AlertTriangle, Loader2, Search, MoreHorizontal, LogIn } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription_shadcn as AlertDescription, AlertTitle as AlertTitleShadcn } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 2.04-4.88 2.04-5.87 0-9.4-4.92-9.4-10.92s3.53-10.92 9.4-10.92c2.62 0 4.17 1.02 5.17 2.04l2.5-2.5C18.97 3.32 16.25 2 12.48 2 5.48 2 0 7.48 0 14.5s5.48 12.5 12.48 12.5c7 0 12.24-4.42 12.24-12.5 0-.8-.08-1.5-.2-2.2z" fill="currentColor" />
    </svg>
);

const MicrosoftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11.4 21.9H2.1V12.6h9.3v9.3zm10.5 0H12.6V12.6h9.3v9.3zM11.4 11.4H2.1V2.1h9.3v9.3zm10.5 0H12.6V2.1h9.3v9.3z" fill="currentColor" />
    </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19.13 14.73a4.1 4.1 0 0 1-1.53 3.14 4.04 4.04 0 0 1-3.21 1.49c-.6.02-1.2-.1-1.74-.34a4.52 4.52 0 0 1-1.63-1.12 4.62 4.62 0 0 1-1.14-1.61c-.34-.56-.56-1.18-.65-1.84a12.52 12.52 0 0 1 .45-3.3 5.47 5.47 0 0 1 2.37-2.83 5.53 5.53 0 0 1 3.52-1.32c.6-.02 1.2.1 1.74.34a4.52 4.52 0 0 1 1.63 1.12 4.62 4.62 0 0 1 1.14 1.61c.34.56.56 1.18.65 1.84a8.3 8.3 0 0 0-.25 3.31zm-5.4-8.47c.92-.04 2.1.45 2.83 1.3.43.51.69 1.12.79 1.78-.1-.03-2.12-1.08-4.2-1.08-1.52 0-2.85.67-3.83 1.86-.54.65-.91 1.43-1.07 2.27.23-.03.47-.05.7-.05 1.17 0 2.2.45 2.97 1.2.5.48.83 1.1.97 1.77a4.67 4.67 0 0 0 1.9-3.21c.14-.94-.2-2.13-1.02-2.83a3.56 3.56 0 0 0-2.14-1.01z" fill="currentColor"/>
    </svg>
);

const AppHeader = ({ onLoginClick }: { onLoginClick: () => void }) => (
    <header className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 lg:px-10 bg-transparent">
        <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                <Link href="#" className="hover:text-primary">Descripción general</Link>
                <Link href="#" className="hover:text-primary">Soluciones</Link>
                <Link href="#" className="hover:text-primary">Productos</Link>
                <Link href="#" className="hover:text-primary">Precios</Link>
                <Link href="#" className="hover:text-primary">Comunidad</Link>
                <Link href="#" className="hover:text-primary">Recursos</Link>
            </nav>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex text-gray-600 hover:text-primary">
                <Search className="h-5 w-5" />
            </Button>
            <Link href="#" className="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-primary">
                Documentación
            </Link>
             <Link href="#" className="hidden md:inline-block text-sm font-medium text-gray-600 hover:text-primary">
                Asistencia
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:inline-flex text-gray-600 hover:text-primary">
                <MoreHorizontal className="h-5 w-5" />
            </Button>
            <Button onClick={onLoginClick} variant="outline" className="h-9">
                Iniciar Sesión
            </Button>
            <Button className="bg-zinc-800 text-white hover:bg-zinc-700 h-9">
                Comenzar
            </Button>
        </div>
    </header>
);

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!auth) {
        toast({
            title: "Error de Configuración",
            description: "La autenticación de Firebase no está disponible.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    // Agregado para depuración de la API Key
    console.log("API Key recibida:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Inicio de Sesión Exitoso",
        description: "Bienvenido de nuevo a ROYALTY.",
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Error de inicio de sesión:", error);
       let description = "Credenciales incorrectas o problema de conexión. Por favor, inténtalo de nuevo.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = 'El correo electrónico o la contraseña son incorrectos. Por favor, verifica tus datos.';
      } else if (error.code === 'auth/invalid-email') {
          description = 'El formato del correo electrónico no es válido.';
      }
      toast({
        title: "Error de Inicio de Sesión",
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-foreground relative">
            <AppHeader onLoginClick={() => setIsLoginModalOpen(true)} />
            <main className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-5xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                    Diseña el futuro con la plataforma de administración empresarial más completa a nivel mundial.
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl">
                    Crea apps y sitios web conversando con una IA.
                </p>

                <Card className="w-full max-w-xl mt-12 text-left bg-card/80 backdrop-blur-sm border-border shadow-xl rounded-2xl">
                    <CardContent className="p-6">
                        <Textarea
                            placeholder="Pídele a ROYALTY que cree un panel para..."
                            className="bg-transparent border-none focus-visible:ring-0 text-base md:text-lg min-h-[80px]"
                        />
                         <div className="flex justify-end border-t pt-4">
                              <DialogTrigger asChild>
                                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-9">
                                    <LogIn className="mr-2 h-4 w-4"/>
                                    Iniciar Sesión para Continuar
                                  </Button>
                              </DialogTrigger>
                         </div>
                    </CardContent>
                </Card>
            </main>
            <footer className="w-full py-4 text-center">
                <p className="text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} ROYALTY. Todos los derechos reservados.
                </p>
            </footer>
        </div>
        
        <DialogContent className="sm:max-w-md bg-card text-card-foreground">
             <DialogHeader className="text-center">
                <DialogTitle className="text-2xl font-bold">Inicia sesión en tu cuenta</DialogTitle>
                <DialogDescription>
                   ¿No tienes una cuenta?{' '}
                   <Link href="#" className="font-medium text-primary hover:underline">
                        Crear cuenta
                   </Link>
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-3 pt-4">
                <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-muted border-border">
                    <GoogleIcon className="mr-2 h-4 w-4"/> Google
                </Button>
                <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-muted border-border">
                    <MicrosoftIcon className="mr-2 h-4 w-4"/> Microsoft
                </Button>
                 <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-muted border-border">
                    <AppleIcon className="mr-2 h-4 w-4"/> Apple
                </Button>
            </div>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    O CONTINÚA CON
                    </span>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitleShadcn>Error</AlertTitleShadcn>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="space-y-1 text-left">
                  <Label htmlFor="email-modal">Correo electrónico</Label>
                  <Input
                    id="email-modal"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="bg-muted/50 border-border focus:ring-primary focus:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-1 text-left">
                  <Label htmlFor="password-modal">Contraseña</Label>
                  <Input
                    id="password-modal"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="bg-muted/50 border-border focus:ring-primary focus:border-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Iniciar Sesión
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  );
}
