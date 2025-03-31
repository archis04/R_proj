import { useState } from "react";
import axios from "axios";

function App() {
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!image) return alert("Please upload an image");

        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post("http://localhost:5000/get-price", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setPrice(response.data.price);
        } catch (error) {
            console.error("Error fetching price", error);
        }
    };

    return (
        <div 
            className="flex flex-col items-center min-h-screen bg-gray-100 p-6 bg-cover bg-center text-white" 
            style={{ backgroundImage: "url(https://res.cloudinary.com/dh6dt6w6z/image/upload/v1743435971/edgar-soto-gb0BZGae1Nk-unsplash_kghudm.jpg)" }}
        >
            <h1 className="text-4xl font-extrabold bg-black bg-opacity-50 px-6 py-3 rounded-lg mt-6">💎 Diamond Price Predictor 💎</h1>
            <div className="flex flex-grow items-center justify-center w-full">
                <div className="bg-white bg-opacity-80 shadow-2xl rounded-2xl p-8 flex flex-col items-center w-96">
                    <label 
                        htmlFor="file-upload" 
                        className="p-3 border border-gray-400 rounded-lg w-full bg-gray-100 text-black text-center cursor-pointer"
                    >
                        {image ? image.name : "Choose a file"}
                    </label>
                    <input 
                        id="file-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden"
                    />
                    <button 
                        onClick={handleSubmit} 
                        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        Get Price
                    </button>
                    {price && <h2 className="mt-4 text-xl font-semibold text-gray-800">Estimated Price: <span className="text-green-700">${price}</span></h2>}
                </div>
            </div>
        </div>
    );
}

export default App;
