import { Info } from "@/pages/dashboard";
import SuggestionBar from "./SuggestionBar";

interface SuggestionBarListProps {
    suggestion: Info[];
    onClickName: (newPokemonName: string) => void;
}

const SuggestionBarList: React.FC<SuggestionBarListProps> = ({ suggestion, onClickName }) => {
    return (
        <>
            <div className="flex  bg-white flex-col shadow-md rounded mt-4 max-h-36 overflow-y-scroll z-10">
                {
                    suggestion.map((result, id) => {
                        return <a onClick={() => onClickName(result.name)} className="cursor-pointer"><SuggestionBar result={result} key={id} /></a>
                    })
                }
            </div>
        </>
    )
};

export default SuggestionBarList;