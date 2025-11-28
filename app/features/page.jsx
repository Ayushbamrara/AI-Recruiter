import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header */}
      <header className=" px-10 py-8 bg-white shadow-sm flex items-center gap-3 justify-center">
        <Image src="/logo.png" width={200} height={200} alt="AI Recruiter Logo" />
        
      </header>

      {/* Title */}
      <section className="text-center mt-16 mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          Explore Our Powerful Features
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Everything you need to conduct smarter, automated, and AI-driven interviews.
        </p>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10 max-w-7xl mx-auto">

        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">AI-Based Question Generation</h3>
          <p className="text-gray-600">
            Automatically generate context-aware questions for any job role using advanced AI.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Smart Interview Scheduling</h3>
          <p className="text-gray-600">
            Schedule interviews with candidates instantly with one click.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Real-Time AI Evaluation</h3>
          <p className="text-gray-600">
            Get AI-powered scoring and insights for each candidate.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Interview Recording & Analysis</h3>
          <p className="text-gray-600">
            Record responses and get detailed analysis on tone, clarity, and confidence.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Candidate Management</h3>
          <p className="text-gray-600">
            Track, sort, and manage all candidate interviews from a single dashboard.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Custom Interview Templates</h3>
          <p className="text-gray-600">
            Create reusable interview templates for different job roles.
          </p>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <a
          href="/dashboard"
          className="bg-blue-600 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Using AI Recruiter
        </a>
      </div>

    </div>
  );
}

