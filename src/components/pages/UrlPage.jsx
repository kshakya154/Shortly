import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Galaxy from "../ui/Galaxy";
import FuzzyText from "../ui/FuzzyText";
import DecryptedText from "../ui/DecryptedText";
function UrlPage() {
  const [shortUrl, setShortUrl] = useState(""); // store short url
  const [loading, setLoading] = useState(false); // loading state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/url", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // { url: "..." }
      });

      const result = await res.json();
      console.log("Server Response:", result);

      // Assuming your backend returns { shortId: "abc123" }
      setShortUrl(`http://localhost:8000/${result.id}`);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  };

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Galaxy Animation */}
      <Galaxy />

      {/* Centered Input Section */}
      <div className="absolute inset-0 flex items-center justify-center px-6 flex-col">
        <div className="mb-8">
          <FuzzyText baseIntensity={0.2}>
            Secure. Easy. Reliable. Snappy
          </FuzzyText>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full max-w-2xl"
        >
          <input
            type="text"
            placeholder="Paste your URL here..."
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                message: "Enter a valid URL",
              },
            })}
            className="w-full rounded-2xl bg-white/5 border border-white/10 
                       backdrop-blur-xl px-6 py-4 text-white 
                       placeholder-white/40 focus:outline-none 
                       focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                       transition-all shadow-lg"
          />

          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 px-5 py-2.5 
                       rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 
                       text-white font-semibold shadow-lg
                       hover:scale-[1.05] active:scale-[0.95] transition-transform"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          {/* Validation message */}
          {errors.url && (
            <p className="mt-2 text-sm text-red-400">{errors.url.message}</p>
          )}
        </form>

        {/* Show Shortened URL */}
        {shortUrl && (
          <div className="mt-6 flex items-center space-x-4 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-md border border-white/20 flex-col">
            <div className="text-gray-100 text-3xl font-semibold mb-8">
              <DecryptedText
                text="Generated Url!"
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
              />
            </div>
            <div className="flex">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline mr-4"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlPage;
