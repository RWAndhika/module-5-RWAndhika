import { Pokemon } from "@/pages/dashboard";

interface DisplayPokemonProps {
    pokemon: Pokemon;
    onAddPokemon: (pokemon: Pokemon) => void;
    onRemovePokemon: (pokemon: Pokemon) => void;
    isFavorited?: boolean;
}

const DisplayPokemon: React.FC<DisplayPokemonProps> = ({ pokemon, onAddPokemon, onRemovePokemon, isFavorited }) => {
    return (
        <>
            <div className="w-11/12 max-w-sm sm:max-w-2/5 bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex justify-center" >
                    <img className="w-40 rounded-t-lg" src={pokemon.img} alt="pokemon image" />
                </div>
                <div className="p-5 flex flex-wrap flex-row items-end justify-between">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                        <p className="mb-3 font-normal text-gray-700">
                            Species: {pokemon.species}<br />
                            Hp: {pokemon.hp}<br />
                            Attack: {pokemon.attack}<br />
                            Defense: {pokemon.defense}<br />
                            Type: {pokemon.type}
                        </p>
                    </div>
                    <div>
                        {!isFavorited ? (
                            <button onClick={() => pokemon && onAddPokemon(pokemon)}
                                className="md:min-w-28 sm:min-w-2 text-white bg-blue-700 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Add
                            </button>
                        ) : (
                            <button onClick={() => pokemon && onRemovePokemon(pokemon)}
                                className="md:min-w-28 sm:min-w-2 text-white bg-red-700 bg-primary-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DisplayPokemon;