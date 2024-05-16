import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DisplayPokemon from "@/components/DisplayPokemon";
import LogOutComponent from "@/components/LogOutComponent";
import SuggestionBarList from "@/components/SuggestionBarList";

const URL = 'https://pokeapi.co/api/v2/pokemon/'

const GET_ALL_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

export type Pokemon = {
    id: number
    name: string,
    species: string,
    img: string,
    hp: number,
    attack: number,
    defense: number,
    type: string,
    favorite: boolean
}

export type Info = {
    name: string,
    url: string
}

const Index = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [pokemonName, setPokemonName] = useState<string>("");
    const [pokemonChosen, setPokemonChosen] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<Pokemon[]>([]);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [allPokemonName, setAllPokemonName] = useState<Info[]>([]);
    const [suggestion, setSuggestion] = useState<Info[]>([]);
    const [pokemon, setPokemon] = useState<Pokemon>({
        id: 0,
        name: "",
        species: "",
        img: "",
        hp: 0,
        attack: 0,
        defense: 0,
        type: "",
        favorite: false
    });

    const router = useRouter();

    const handleFavorite = (newPokemon: Pokemon) => {
        if (localStorage.getItem('favorites')) {
            setIsFavorited(false);
            const items = JSON.parse(localStorage.getItem('favorites') || "");
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === newPokemon.id) setIsFavorited(true);
            }
        }
    }

    useEffect(() => {
        console.log(isFavorited);
    },[isFavorited])

    const handleAddPokemon = (newPokemon: Pokemon) => {
        setFavorite([...favorite, newPokemon]);
        setPokemonChosen(false);
    };

    const handleSuggestionClick = (newPokemonName: string) => {
        setPokemonName(newPokemonName);
        setSuggestion([]);
    };

    const handleRemovePokemon = (newPokemon: Pokemon) => {
        if (favorite.length > 0) {
            setFavorite(
                favorite.filter(a =>
                    a.id !== newPokemon.id
                )
            )
            localStorage.favorites = JSON.stringify(favorite);
        }
        setPokemonChosen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value.toLowerCase());
        handleSuggestion(e.target.value.toLowerCase());
    }

    useEffect(() => {
        getAllPokemon();
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', "[]");
        }
        const items = JSON.parse(localStorage.getItem('favorites') || "");
        if (items) {
            setFavorite(items);
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('favorites', JSON.stringify(favorite));
        }, 1000);
    }, [favorite]);


    const loadFavorite = () => {
        localStorage.setItem('favorites', JSON.stringify(favorite));
        router.push('/favorites');
    }

    const handleSuggestion = (value: string) => {
        if (value) {
            const result = allPokemonName.filter(item =>
                item.name.includes(value)
            );
            setSuggestion(result);
        } else {
            setSuggestion([]);
        }
    }

    const getAllPokemon = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${GET_ALL_URL}`)
            const data = await response.json()
            if (!response.ok) {
                throw new Error("get pokemon data by name failed!");
            } else {
                setAllPokemonName(data.results);
                setLoading(false)
            }
          } catch (error) {
            alert(error)
            setLoading(false)
          }
    }

    const searchPokemon = async () => {
        setSuggestion([]);
        try {
            setLoading(true);
            const response = await fetch(`${URL}${pokemonName}`)
            if (!response.ok) {
                setPokemonChosen(false);
                throw new Error("Searching pokemon failed!");
            } else {
                const data = await response.json();
                handleFavorite(data);
                setPokemon({
                    id: data.id,
                    name: pokemonName,
                    species: data.species.name,
                    img: `${IMG_URL}${data.id}.png`,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    type: data.types[0].type.name,
                    favorite: isFavorited
                });
                setLoading(false);
                setPokemonChosen(true);
                setPokemonName("");
            }

        } catch (error) {
            alert(error);
            setLoading(false);
        }
    };

    return (
        <section className="bg-yellow-50 mx-auto h-screen">
            <LogOutComponent />
            <div className="flex items-center justify-center pt-4 gap-24">
                <img className="w-max h-12" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
                <div className="pr-4">
                    <button onClick={loadFavorite}
                        className="text-white bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" >
                        Favorites
                    </button>
                </div>
            </div>
            <div className="max-w-md mx-auto pt-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" value={pokemonName} id="default-search" placeholder="Search Pokemon..." onChange={handleChange}
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
                    <button onClick={searchPokemon} disabled={!pokemonName}
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2" >
                        Search
                    </button>
                </div>
                <SuggestionBarList suggestion={suggestion} onClickName={handleSuggestionClick} />
            </div>
            <div className="flex flex-column justify-center pt-4">
                {loading ? (
                    <div className='animate-spin w-16 mt-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" /></svg>
                    </div>
                ) : (
                    !pokemonChosen ? (
                        <h1>Please choose a pokemon</h1>
                    ) : (
                        <DisplayPokemon pokemon={pokemon} onAddPokemon={handleAddPokemon} onRemovePokemon={handleRemovePokemon} isFavorited={isFavorited} />
                    )
                )}
            </div>
        </section>

    );
};

export default Index;