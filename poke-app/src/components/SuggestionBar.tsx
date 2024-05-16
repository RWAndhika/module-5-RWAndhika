import { Info } from "@/pages/dashboard";

interface SuggestionBarProps {
    result: Info;
}

const SuggestionBar: React.FC<SuggestionBarProps> = ({ result }) => {
    return (
        <div className="hover:bg-gray-100 p-1">{result.name}</div>
    )
};

export default SuggestionBar;