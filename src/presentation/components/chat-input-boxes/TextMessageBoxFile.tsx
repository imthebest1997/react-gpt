import { useRef, useState } from "react";

interface TextMessageBoxProps {
    onSendMessage: (message: string) => void;
    placeholder?: string;
    disableCorrections?: boolean;
    accept?: string;
}

export const TextMessageBoxFile = ({ onSendMessage, placeholder, disableCorrections = false, accept }: TextMessageBoxProps) => {

    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if( message.trim().length === 0 ) return;
        onSendMessage(message);
        setMessage("");
    }


    return (
        <form
            onSubmit={ handleSendMessage }
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        >
            <div className="mr-3">
                <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                >
                    <i className="fa-solid fa-paperclip text-xl"></i>
                </button>
                <input 
                    hidden
                    type="file" 
                    ref = {inputFileRef}
                    accept= { accept }
                    onChange={ (e) => setSelectedFile(e.target.files?.[0] || null) }
                />
            </div>

            <div className="flex-grow">
                <div className="relative w-full">
                    <input 
                        type="text" 
                        autoFocus
                        placeholder= { placeholder }
                        name="message"
                        className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 h-10 pl-4"
                        autoComplete= { disableCorrections ? "on" : "off" }
                        autoCorrect= { disableCorrections ? "on" : "off" }
                        spellCheck = { disableCorrections ? true : false }
                        value = { message }
                        onChange={ (event) => setMessage(event.target.value) }
                    />
                </div>
            </div>

            <div className="ml-4">
                <button 
                    className="btn-primary"
                    disabled = { !message.trim() && !selectedFile }
                >
                    {
                        (!selectedFile)
                            ? <span className="mr-2">Enviar</span>
                            : <span className="mr-2"> {selectedFile.name.substring(0, 10) + "..."}</span>                            
                    }
                    <span className="mr-2">
                        Enviar
                    </span>
                    <i className="fa-regular fa-paper-plane"></i>                
                </button>
            </div>

        </form>
    )
}
