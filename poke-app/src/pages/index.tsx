import { useRouter } from "next/router";

const Home = () => {

    const router = useRouter();

    return (
        <section className="bg-yellow-50 dark:bg-gray-900 mx-auto md:h-screen">
            <div className="gap-4 flex flex-col justify-center items-center px-6 py-8 mx-auto h-screen lg:py-0">
                <img className="w-max h-12" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
                <div className="flex text-center flex-col">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-black md:text-5xl lg:text-6xl">
                        Welcome to Pokedex
                    </h1>
                    <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                        a pokemon web database for finding every pokemon in existence.
                    </p>
                </div>
                <div className="flex flex-row gap-4">
                    <button onClick={() => { router.push('/login') }}
                        className="min-w-28 text-white bg-blue-700 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Login
                    </button>
                    <button onClick={() => { router.push('/register') }}
                        className="min-w-28 text-white bg-blue-700 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Register
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;