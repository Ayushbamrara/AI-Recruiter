import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      
      {/* Logo */}
      <div className="mb-6">
        <Image 
          src="/logo.png" 
          width={200} 
          height={200} 
          alt="AI Recruiter Logo" 
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 text-center max-w-xl mb-10">
        Have questions or need support?  
        Send us a message and we’ll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        
        {/* Email Input */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Your Email</span>
          <input
            type="email"
            required
            placeholder="yourmail@gmail.com"
            className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </label>

        {/* Message Input */}
        <label className="block mb-6">
          <span className="text-gray-700 font-medium">Your Message</span>
          <textarea
            rows="5"
            required
            placeholder="Write your message here..."
            className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          ></textarea>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}
