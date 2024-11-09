'use client'

import {useState} from 'react'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {CircleIcon} from "lucide-react";
import {useSignupMutation} from "@/queries/auth";
import {pageLinks} from "@/utils/pages";

export default function LoginPage({type}: { type: 'signin' | 'signup' }) {
  const isLogin = type === 'signin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {mutateAsync} = useSignupMutation()

  const login = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      // Handle error (e.g., show error message)
      console.error(result.error)
    } else {
      router.push(pageLinks.myPages) // Redirect to dashboard on successful login
    }
  }

  const signup = async () => {
    // Implement signup logic here
    const result = await mutateAsync({
      email,
      password
    });

    if (result.data) {
      await login()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (isLogin) {
      await login()
    } else {
      await signup()
    }

    setIsLoading(false)
  }

  const handleGoogleLogin = () => {
    signIn('google', {callbackUrl: '/dashboard'})
  }

  return (
    <div className="flex h-full items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="MeWEB Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome to MeWEB</CardTitle>
          <CardDescription className="text-center">
            Inicia sesión para administrar tus páginas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <CircleIcon className="mr-2 h-4 w-4 animate-spin"/>
                  {isLogin ? 'Iniciando sesión...' : 'Creando la cuenta...'}
                </>
              ) : (
                isLogin ? 'Iniciar sesión' : 'Crear cuenta'
              )}
            </Button>
          </form>
          {false && <>
              <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"/>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
                {/*<Icons.google className="mr-2 h-4 w-4" />*/}
                  Google
              </Button></>}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-sm text-center text-muted-foreground">
            {isLogin ? '¿No tiene una cuenta?' : '¿Ya tiene una cuenta?'}{' '}
            <Link href={isLogin ? pageLinks.signup : pageLinks.login} className="text-primary hover:underline">
              {isLogin ? 'Crea una cuenta' : 'Inicia sesión'}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}