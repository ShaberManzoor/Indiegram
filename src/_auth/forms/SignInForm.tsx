"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/lib/context/AuthContext"
 
const SignInForm = () => {
  const {checkAuthUser, isLoading:isUserLoading} = useUserContext();
  const navigate = useNavigate();

  const {mutateAsync: signInAccount} = useSignInAccount();
  
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  })

 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })    

    if(!session){
      return toast({title: 'Sign in failed. Please try again later'});
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();

      navigate('/');
    }else{
      return toast({title: 'Sign up failed. Please try again later'});
    }
  }
  return (
    <Form {...form}>
      <div className="w-full sm:w-420 flex-center flex-col p-4">
        <img src="/assets/images/logo.png" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5">Log in to your account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit" className="shad-button_primary">
          {isUserLoading ? (
            <div className="flex-center gap-2">
              <Loader />
              Loading....
            </div>
          ): "Sign in"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Don't have an account? 
          <Link to={'/sign-up'} className="text-primary-500 ml-1 text-small-semibold">Sign up</Link>
        </p>
      </form>
    </div>
    </Form>
  )
}

export default SignInForm