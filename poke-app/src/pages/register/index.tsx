import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

const Register = () => {

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const initialValues = {
        name: name,
        password: password
    }

    const router = useRouter();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Required")
            .min(3, 'too short!'),

        password: Yup.string().required("Required")
            .min(5, "must atleast 5 chars!"),
    });

    const handleRegister = (name: string, password: string) => {
        localStorage.setItem('name', name);
        localStorage.setItem('password', password);
        alert('Register successful');
        router.push('/login');
    }

    return (
        <section className="bg-yellow-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a onClick={() => {router.push('/')}} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 cursor-pointer">
                    <img className="w-max h-8 mr-2" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
                    Pokedex
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Register Account
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerSchema}
                            onSubmit={(values) => {
                                handleRegister(values.name, values.password)
                            }}
                        >
                            <Form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900">
                                            Name:
                                        </label>
                                    <Field type="text" id="name" name="name" placeholder="Enter your name" values={onChangeName}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                    <ErrorMessage name="name" component="div" />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                        className="block mb-2 text-sm font-medium">
                                            Password:
                                        </label>
                                    <Field type="password" id="password" name="password" placeholder="••••••••" values={onChangePassword}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                <button type="submit"
                                    className="w-full text-white bg-blue-700 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Register
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <a onClick={() => router.push('/login')} className="cursor-pointer font-medium text-primary-600 hover:underline">Login</a>
                                </p>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;