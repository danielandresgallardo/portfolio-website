export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight">Daniel Gallardo</h2>
          <div className="flex gap-8 text-sm">
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Projects</a>
            <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Experience</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
                AI & Machine Learning<br />Engineer
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                CS Master's student at Constructor University Bremen, specializing in Artificial Intelligence. Building innovative AI solutions and exploring the future of generative AI.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                I'm a passionate AI engineer with a focus on generative AI and machine learning. Currently pursuing my Master's degree in Computer Science at Constructor University Bremen, I combine theoretical knowledge with practical experience building real-world AI applications.
              </p>
              <p>
                My interests span across natural language processing, computer vision, and innovative AI applications. I thrive on exploring how cutting-edge AI technologies can solve complex problems and create meaningful impact.
              </p>
            </div>
            <div className="space-y-4 text-zinc-700 dark:text-zinc-300">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Education</h3>
                <p className="text-sm">Master's in Computer Science, AI Specialization</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Constructor University Bremen</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-50">Focus Areas</h3>
                <p className="text-sm">Generative AI, NLP, Machine Learning, System Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="space-y-8">
            {/* Project 1 */}
            <div className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-zinc-900/50 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">BMW GenAI Hackathon Winner</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Winner • 2024</p>
                </div>
                <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold">🏆</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                Developed an innovative generative AI solution that won the BMW GenAI Hackathon. The project showcased cutting-edge LLM applications and creative problem-solving in the automotive AI space.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-xs font-medium">LLM</span>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-xs font-medium">Generative AI</span>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-xs font-medium">Innovation</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-zinc-900/50 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">SimCarma</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Personal Project</p>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                A sophisticated simulation and analysis platform built to explore complex systems and machine learning applications. Features advanced visualization, data processing pipelines, and real-time analysis capabilities.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded text-xs font-medium">Python</span>
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded text-xs font-medium">Simulation</span>
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded text-xs font-medium">Data Science</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-zinc-900/50 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Entity Recognition Thesis</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Research Project</p>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                Comprehensive research thesis on advanced entity recognition techniques using deep learning. Explores novel architectures and training methodologies for improving NLP model accuracy and efficiency.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded text-xs font-medium">NLP</span>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded text-xs font-medium">Deep Learning</span>
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded text-xs font-medium">Research</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Work Experience</h2>
          <div className="space-y-8">
            {/* Experience 1 */}
            <div className="border-l-2 border-blue-500 pl-8">
              <h3 className="text-xl font-bold mb-1">AI & Machine Learning Focus</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Constructor University Bremen • Current</p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Advanced studies in AI and machine learning, with hands-on experience in generative models, NLP, and practical AI applications. Actively developing real-world solutions and contributing to research initiatives.
              </p>
            </div>

            {/* Experience 2 */}
            <div className="border-l-2 border-purple-500 pl-8">
              <h3 className="text-xl font-bold mb-1">Hackathon Winner - BMW GenAI</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">2024</p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Led the development of a winning AI solution in a competitive hackathon environment. Demonstrated rapid prototyping, innovative problem-solving, and effective team collaboration under time constraints.
              </p>
            </div>

            {/* Experience 3 */}
            <div className="border-l-2 border-green-500 pl-8">
              <h3 className="text-xl font-bold mb-1">Research & Development</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">Various Projects • Ongoing</p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Engaged in cutting-edge research across NLP, computer vision, and generative AI. Published findings and actively contributed to the advancement of AI technologies through rigorous experimentation and analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              I'm always open to discussing AI, machine learning, and exciting opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="mailto:daniel-gallardo@live.com"
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 break-all">daniel-gallardo@live.com</p>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">💻</div>
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Check out my projects</p>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-4">🔗</div>
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Professional profile</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© 2024 Daniel Gallardo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
