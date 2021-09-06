import {useState} from "react";
import Input from "@material-tailwind/react/Input";
import useFormControls from "../../hooks/useFormControls";


export default function GenericsInput(properties) {

    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = event => {
        setSearchTerm(event.target.value)
        // console.log(event.target.value)
        properties.onChange(event)
    
    };

    const variable = useFormControls(properties.entity);

    const searchResults = !searchTerm.results
        ? variable.results
        : variable.results.filter(variable =>
            variable.results.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
        // console.log(properties)    

    return (
        <div>
            <Input
                type={properties.type}
                color={properties.color}
                size={properties.size}
                outline={properties.outline}
                placeholder={properties.placeholder}
                value={properties.value}
                name={properties.name}
                onChange={handleChange}
                list={properties.entity}
            />
            <datalist id={properties.entity}>
                {searchResults.map((item, i) => (
                    <option key={i}>{item}</option>
                ))}
            </datalist>
        </div>
    );
}