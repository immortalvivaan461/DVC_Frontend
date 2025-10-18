import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "", // ✅ Added to match backend schema
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // "success" | "error"

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // ✅ Make sure your .env.local has:
            // VITE_API_URL=http://localhost:5000
            await axios.post(`${import.meta.env.VITE_API_URL}/contactus`, formData);

            setStatus("success");
            setFormData({
                name: "",
                email: "",
                contact: "",
                message: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">📩 Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
                <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Your Contact Number"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none resize-none"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                                ></path>
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        "Send Message"
                    )}
                </button>
            </form>

            {/* ✅ Feedback message */}
            {status === "success" && (
                <p className="mt-4 text-green-600 text-center animate-fade-in">
                    ✅ Message sent successfully!
                </p>
            )}
            {status === "error" && (
                <p className="mt-4 text-red-600 text-center animate-fade-in">
                    ❌ Failed to send message. Please try again.
                </p>
            )}
        </div>
    );
};

export default ContactForm;
