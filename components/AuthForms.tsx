"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import next from "next"
import { toast } from "sonner"
import FormField from "@/components/FormField"
import { useRouter } from "next/navigation"



const authFormSchema = (type : FormType) => {
    return z.object({
        name : type === "sign-up"? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}
const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if(type === "sign-up"){
                toast.success("Account created successfully! PLease sign in to continue.")
                router.push('/sign-in')
                
            }else{
                toast.success("Sign in successful!")
                router.push('/')
            }
        }catch(error){
            console.log(error);
            toast.error(`there is an error ${error}`)
        }
    }
    const isSignIn = type === "sign-in"
    // const isSignUp = type === "sign-up" 
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>

                <h3>Practice job interviews with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 form w-full">
                        {!isSignIn && (
                            <FormField 
                                control={form.control} 
                                name="name" 
                                label="Name" 
                                placeholder="Enter Your Name" />
                        )}
                        <FormField 
                                control={form.control} 
                                name="email" 
                                label="Email" 
                                placeholder="Enter Your E-mail"
                                type="email" />
                                 
                        <FormField 
                                control={form.control} 
                                name="password" 
                                label="Password" 
                                placeholder="Enter Your Password"
                                type="password" />
                        <Button className="btn" type="submit">{isSignIn ? 'Sign in':'Create an Account'}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?":"Have an account already?"}
                    <Link href={!isSignIn? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
                        {!isSignIn ? "Sign in" : "Sign up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm