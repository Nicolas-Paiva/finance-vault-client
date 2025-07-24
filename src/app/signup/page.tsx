'use client';

import {Card} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import React, {useEffect, useState} from 'react';
import {
    isEmailValid,
    isPasswordValid,
    passwordContainsSpecialCharacter,
    passwordContainsUppercase
} from '@/lib/utils/utils';
import {toast} from 'sonner';
import Navbar from '@/components/ui/navbar';
import {Checkbox} from '@/components/ui/checkbox';
import CurrencySelect from '@/components/ui/currency-select';
import {RegistrationRequest, RegistrationSuccessResponse} from '@/lib/types/auth';
import {Currency} from '@/lib/types/currencies';
import {register} from '@/lib/services/auth-service';
import {useMutation} from '@tanstack/react-query';
import Link from 'next/link';
import {Loader2Icon} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {FaEye, FaEyeSlash} from 'react-icons/fa';


export default function SignUp() {

    // Data input
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [checked, setChecked] = useState(false);

    // Error messages
    const [nameError, setNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [notCheckedError, setNotCheckedError] = useState(false);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

    // Dynamic password check
    const [tooShort, setTooShort] = useState(false);
    const [noSpecialCharacter, setNoSpecialCharacter] = useState(false);
    const [noUpperCaseLetter, setNoUpperCaseLetter] = useState(false);

    // Controls the password input type
    const [passwordInputType, setPasswordInputType] = useState('password');


    function togglePasswordVisibility(): void {
        setPasswordInputType(prev => {
            return prev === 'password' ? 'text' : 'password';
        });
    }


    const router = useRouter();


    /**
     * Checks form data. Returns true only if all
     * data is valid
     */
    function validateForm(): boolean {
        let isValid = true;

        setNameError(name.trim() === '');
        setLastNameError(lastName.trim() === '');
        setEmailError(!isEmailValid(email));
        setPasswordError(password.trim() === '');

        if (!checked) {
            setNotCheckedError(true);
        }

        if (
            name.trim() === '' ||
            lastName.trim() === '' ||
            !isEmailValid(email) ||
            !isPasswordValid(password) ||
            !checked
        ) {
            isValid = false;
        }

        return isValid;
    }


    /**
     * Builds the registration request with
     * form data
     */
    function buildRequest(): RegistrationRequest {
        return {
            email,
            password,
            name,
            lastName,
            currency
        };
    }


    const registerMutation = useMutation({
        mutationFn: async (request: RegistrationRequest) => {
            return await register(request);
        },

        onSuccess: (data: RegistrationSuccessResponse) => {
            toast.success('User registered successfully!');
            localStorage.setItem('token', data.jwtToken);
            setName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setChecked(false);
            router.push('/home');
        },

        onError: (error) => {

            if (error.message === 'Email already exists') {
                toast.error(error.message);
                setEmailAlreadyExists(true);
            } else {
                toast.error('Something went wrong');
                setEmailAlreadyExists(false);
            }

        }
    });


    return (
        <>
            <Navbar showSignup={false}/>

            <h1 className="text-center text-3xl md:text-5xl mt-24">Sign Up</h1>

            <section className="flex items-center justify-center mt-4 md:mt-12">
                <Card className="w-full lg:w-2/3 mx-auto px-4 py-12">
                    <div className="w-full md:w-[80%] md:mx-auto">
                        <div className="flex flex-col justify-around h-full gap-y-4 md:flex-row md:justify-between">
                            <div className="md:w-1/3">
                                <Label htmlFor="first-name" className="ml-2 mb-1">First Name</Label>
                                <Input type="text"
                                       id="first-name"
                                       value={name}
                                       placeholder="John"
                                       onChange={(e) => setName(e.target.value)}
                                       onClick={() => setNameError(false)}
                                />
                                {nameError && <p className="ml-2 text-xs text-destructive">Please provide your name</p>}
                            </div>

                            <div className="md:w-1/3">
                                <Label htmlFor="last-name" className="ml-2 mb-2">Last Name</Label>
                                <Input type="text"
                                       id="last-name"
                                       value={lastName}
                                       placeholder="Doe"
                                       onChange={(e) => setLastName(e.target.value)}
                                       onClick={() => setLastNameError(false)}
                                />
                                {lastNameError &&
                                    <p className="ml-2 text-xs text-destructive">Please provide your last name</p>}
                            </div>
                        </div>

                        <Label htmlFor="email" className="ml-2 mb-1 mt-4">Email</Label>
                        <Input type="email"
                               id="email"
                               value={email}
                               placeholder="your@email.com"
                               onChange={(e) => setEmail(e.target.value)}
                               onClick={() => {
                                   setEmailError(false);
                                   setEmailAlreadyExists(false);
                               }}
                        />
                        {emailError && <p className="ml-2 text-xs text-destructive">Invalid email</p>}
                        {emailAlreadyExists &&
                            <p className="ml-2 text-xs text-destructive">Email already in use. Please try another
                                one.</p>}


                        <Label htmlFor="password" className="ml-2 mb-1 mt-4">Password</Label>
                        <div className="relative">
                            <Input type={passwordInputType}
                                   id="password"
                                   value={password}
                                   placeholder="Password"
                                   onChange={(e) => {
                                       setPassword(e.target.value);

                                       if (e.target.value.length >= 8) {
                                           setTooShort(false);
                                       } else {
                                           setTooShort(true);
                                       }

                                       if (passwordContainsSpecialCharacter(e.target.value)) {
                                           setNoSpecialCharacter(false);
                                       } else {
                                           setNoSpecialCharacter(true);
                                       }

                                       if (passwordContainsUppercase(e.target.value)) {
                                           setNoUpperCaseLetter(false);
                                       } else {
                                           setNoUpperCaseLetter(true);
                                       }
                                   }}
                                   onClick={() => setPasswordError(false)}
                            />
                            <span className="absolute top-[10] right-4" onClick={togglePasswordVisibility}>
                                {passwordInputType === 'password' ?
                                    <FaEye/>
                                    :
                                    <FaEyeSlash/>
                                }
                            </span>
                        </div>
                        {passwordError &&
                            <p className="ml-2 text-xs text-destructive">Please provide a valid password</p>}
                        <ul>
                            <li className={`ml-6 list-disc text-xs ${tooShort ? 'text-destructive' : 'text-muted-foreground'}`}>At
                                least 8 characters
                            </li>
                            <li className={`ml-6 list-disc text-xs  ${noSpecialCharacter ? 'text-destructive' : 'text-muted-foreground'}`}>At
                                least 1 special character
                            </li>
                            <li className={`ml-6 list-disc text-xs  ${noUpperCaseLetter ? 'text-destructive' : 'text-muted-foreground'}`}>At
                                least 1 uppercase letter
                            </li>
                        </ul>


                        <Label htmlFor="currency" className="ml-2 mb-1 mt-4">Currency</Label>
                        <CurrencySelect id="currency" className="w-full mb-6" value={currency}
                                        onValueChange={(value) => setCurrency(value)}/>


                        <div className="flex items-start gap-3">
                            <Checkbox id="terms-2" checked={checked} onClick={() => {
                                setChecked(!checked);

                                if (notCheckedError) {
                                    setNotCheckedError(false);
                                }

                            }}/>
                            <div className="grid gap-2">
                                <Label htmlFor="terms-2">Accept terms and conditions</Label>
                                <p className="text-muted-foreground text-sm">
                                    By clicking this checkbox, you agree to the terms and conditions.
                                </p>
                            </div>
                        </div>
                        {notCheckedError &&
                            <p className="text-xs text-destructive mb-6">Please agree to our terms before registering.
                            </p>
                        }

                        <div className="flex items-center gap-3 mt-4">
                            <Checkbox id="terms"/>
                            <Label htmlFor="terms">Receive newsletter by email</Label>
                        </div>

                        {registerMutation.isPending ?
                            <Button disabled className="w-full mt-6">
                                <Loader2Icon className="animate-spin"/>Please wait
                            </Button> :
                            <Button className="w-full mt-6"
                                    onClick={() => {
                                        if (!validateForm()) return;
                                        const request = buildRequest();
                                        registerMutation.mutate(request);
                                    }
                                    }>
                                Submit
                            </Button>
                        }

                        <p className="text-xs md:text-sm mt-2">Already have an account? <Link
                            className="underline text-violet-400" href="/login">Log in here</Link></p>
                    </div>
                </Card>
            </section>
        </>
    );
};
