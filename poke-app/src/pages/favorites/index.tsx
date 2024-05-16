import { Pokemon } from "../dashboard";
import { useEffect, useState } from "react";
import DisplayPokemon from "@/components/DisplayPokemon";
import { useRouter } from "next/router";

const Index = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    const router = useRouter();

    const handleAddPokemon = (newPokemon: Pokemon) => {
        setPokemonList([...pokemonList, newPokemon]);
    };

    const handleRemovePokemon = (newPokemon: Pokemon) => {
        if (pokemonList.length > 0) {
            const array: Pokemon[] = [...pokemonList];
            let index: number = array.indexOf(newPokemon);
            if (index !== -1) {
                if (array.length === 1) {
                    setPokemonList([]);
                    localStorage.setItem('favorites', "[]");
                }
                array.splice(index, 1);
                setPokemonList(array);
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', "[]");
        }
        const items = JSON.parse(localStorage.getItem('favorites') || "");
        if (items) {
            setPokemonList(items);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('favorites', JSON.stringify(pokemonList));
        }, 1000);
    }, [pokemonList]);

    return (
        <section className="bg-yellow-50 mx-auto min-h-screen">
            <div className="flex items-center justify-center pt-4 gap-24">
                <a onClick={() => router.push('/dashboard')} className="cursor-pointer">
                <img className="w-max h-12" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
                </a>
            </div>
            <div className="flex flex-row flex-wrap justify-center pt-4 gap-3 pb-4">
                {loading ? (
                    <div className='animate-spin w-16 mt-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" /></svg>
                    </div>
                ) : (
                    pokemonList.length === 0 ? (
                        <h1>No pokemon favorited!</h1>
                    ) : (
                        pokemonList.map(item => (
                            <DisplayPokemon pokemon={item} onAddPokemon={handleAddPokemon} onRemovePokemon={handleRemovePokemon} isFavorited={true} />
                        ))
                    )
                )}
            </div>
        </section>
    )
};

export default Index;