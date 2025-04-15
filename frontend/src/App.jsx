import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState("");
    const [details, setDetails] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!image) return alert("Please upload an image");
    
        const formData = new FormData();
        formData.append("file", image);
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/diamond-price", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(response.data);
    
            const usdPrice = response.data.price[0];
            const conversionRate = 83; // Example conversion rate
            const inrPrice = (usdPrice * conversionRate).toFixed(2);
    
            setPrice(inrPrice); // Set price in INR
            setDetails({
                carat: response.data.carat[0],
                cut: response.data.cut[0],
                color: response.data.color[0],
                clarity: response.data.clarity[0],
            });
        } catch (error) {
            console.error("Error fetching price", error);
        }
    };    

    return (
        <div 
            className="flex flex-col items-center min-h-screen bg-gray-100 p-6 bg-cover bg-center text-white" 
            style={{ backgroundImage: "url(https://res.cloudinary.com/dh6dt6w6z/image/upload/v1743435971/edgar-soto-gb0BZGae1Nk-unsplash_kghudm.jpg)" }}
        >
            <motion.h1 
                className="text-4xl font-extrabold bg-black bg-opacity-50 px-6 py-3 rounded-lg mt-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                💎 Diamond Price Predictor 💎
            </motion.h1>
            <div className="flex flex-grow items-center justify-center w-full">
                <motion.div 
                    className="bg-white bg-opacity-80 shadow-2xl rounded-2xl p-8 flex flex-col items-center w-96"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
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
                    {image && (
                        <motion.img 
                            src={URL.createObjectURL(image)} 
                            alt="Uploaded" 
                            className="mt-4 w-48 h-48 object-cover rounded-lg shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                    <button 
                        onClick={handleSubmit} 
                        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                        Get Price
                    </button>
                    {price && details && (
                        <motion.div 
                            className="mt-6 text-gray-800 w-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold text-center">
                                Estimated Price: <span className="text-green-700">₹{price}</span>
                            </h2>
                            <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
                                <p><strong>Carat:</strong> {details.carat}</p>
                                <p><strong>Cut:</strong> {details.cut}</p>
                                <p><strong>Color:</strong> {details.color}</p>
                                <p><strong>Clarity:</strong> {details.clarity}</p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default App;
