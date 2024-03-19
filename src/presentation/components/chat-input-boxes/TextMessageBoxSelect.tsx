import { useState } from "react";

interface TextMessageBoxProps {
    onSendMessage: (message: string, selectedOption: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    options: Option[];
}

interface Option{
    id: string;
    text: string;
}

export const TextMessageBoxSelect = ({ onSendMessage, placeholder, disableCorrections = false, options }: TextMessageBoxProps) => {

    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( message.trim().length === 0 ) return;
        onSendMessage(message, selectedOption);
        setMessage("");
    }


    return (
        <form
            onSubmit={ handleSendMessage }
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >
            <div className="flex-grow">
                <div className="flex w-full">
                    <input 
                        type="text" 
                        autoFocus
                        placeholder= { placeholder }
                        name="message"
                        className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4"
                        autoComplete= { disableCorrections ? "on" : "off" }
                        autoCorrect= { disableCorrections ? "on" : "off" }
                        spellCheck = { disableCorrections ? true : false }
                        value = { message }
                        onChange={ (event) => setMessage(event.target.value) }
                    />
                    <select 
                        name="select" 
                        className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4"
                        value={selectedOption}
                        onChange={(event) => setSelectedOption(event.target.value)}
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        {
                            options.map(({id, text}) => (
                                <option key={id} value={text}>{text}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="ml-4">
                <button className="btn-primary">
                    <span className="mr-2">
                        Enviar
                    </span>
                    <i className="fa-regular fa-paper-plane"></i>                
                </button>
            </div>

        </form>
    )
}
