import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 fade-in">
        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-nationals-red mb-6">About This Project</h1>
        
        {/* About Me Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-nationals-blue mb-4">About Me</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
            I’m a computer science student who’s been intrigued by Frontend development,
             Artificial Intelligence and Deep Learning, mostly because I can’t help but worder about well designed websites and data manipulation's behind it.
              I’m the type of person who’ll admire a beautiful interface and immediately wonder what algorithms are humming behind it. 
              For me, frontend development is the art, and machine learning is the science, and building things that blend both 
              feels like solving a puzzle that’s equal parts logic, creativity, and “okay, but what if we tried this…?”

            </p>
            <p>
            When it comes to ML, I’m weirdly entertained by the mathematical magic behind neural networks and how they turn 
            raw data into smart behavior. My dream is to create applications that look simple, friendly, and “Oh wow, this feels nice,” 
            but secretly run on thoughtful, intelligent systems under the hood. Think of it as mixing minimalism with brainpower. 
            Whether I’m tuning a model or polishing a UI, I’m all about crafting experiences that don’t just work, they learn.
            </p>
            <p>Right now, I’m focused on:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mastering React, TypeScript, and modern web frameworks</li>
              <li>Deepening my understanding of neural networks and deep learning</li>
              <li>Building full-stack applications that integrate ML models</li>
              <li>Exploring how AI/ML ideas can be brought into web-based experiences</li>
            </ul>
          </div>
        </section>

        {/* About This Application Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-nationals-blue mb-4">About This Application</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              This MLB Pitch Analysis Dashboard is a project that allowed me to combine data visualization, 
              API development, and clean UI design into one application. I wanted to build something that felt modern 
              and organized, while also handling real-world baseball statistics in a structured way. 
              The dashboard fetches data dynamically, displays it in interactive components, and offers a smooth, 
              responsive experience for users exploring pitcher-level analysis.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 my-6">
              <h3 className="text-lg font-semibold text-nationals-blue mb-3">Technical Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Frontend:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>React 18 with Hooks</li>
                    <li>React Router for navigation</li>
                    <li>Tailwind CSS for styling</li>
                    <li>Axios for API communication</li>
                    <li>Vite for fast development and build tooling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Backend:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>Node.js with Express</li>
                    <li>SQLite database</li>
                    <li>RESTful API architecture</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dynamic Data Loading:</strong> Fetches pitcher data in real time</li>
              <li><strong>Interactive Tables:</strong> Sortable views for quick analysis</li>
              <li><strong>Responsive UI:</strong> Works smoothly on both desktop and mobile</li>
              <li><strong>Error Handling:</strong> Uses fallback demo data when the API is unavailable</li>
              <li><strong>Performance Optimization:</strong> Lightweight components and efficient rendering</li>
            </ul>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3 mt-6">Design Decisions</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Single Page Application:</strong> Smooth navigation without reloads</li>
              <li><strong>Component-Based Architecture:</strong> Each UI piece is modular and maintainable</li>
              <li><strong>Baseball-Themed UI:</strong> A color scheme and layout inspired by the sport and the team</li>
              <li><strong>Accessibility-First Approach:</strong> Uses semantic HTML and ARIA attributes</li>
            </ul>
          </div>
        </section>

        {/* My Development Process Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-nationals-blue mb-4">My Development Process</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              When I started this project, I knew I wanted to create something that felt polished both visually and structurally. 
              I began by outlining the flow of data: where it would come from, how the API would shape it, and how users would interact with it on the frontend. 
              This planning step gave me a clear roadmap for building the backend first, then layering the frontend on top.
            </p>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3">Planning & Architecture</h3>
            <p>
              I broke the project into stages:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Setting up the database and API</li>
              <li>Building the core Express routes</li>
              <li>Creating reusable frontend components</li>
              <li>Styling with Tailwind</li>
              <li>Testing user flows and refining the UI</li>
            </ul>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3">Choosing the Tech Stack</h3>
            <p>
              React for frontend flexibility, Tailwind for styling consistency, Vite for fast builds. 
              Backend uses Express and SQLite for lightweight, efficient development.
            </p>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3">What Was New and What I Already Knew</h3>
            <p>
              React was familiar, Express was partially familiar but used more fully here. This project helped me gain confidence with APIs, routing, and database handling.
            </p>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3">Using AI Tools</h3>
            <p>
              I used AI tools like ChatGPT to troubleshoot and generate ideas. keeping my prompt specific and giving right context helped a lot, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>“Why isn’t my Express route sending JSON?”</li>
              <li>“How do I make a sortable table column in React?”</li>
            </ul>
            <p>
              Longer, more complicated prompts were less effective. Keeping it simple saved a lot of time.
            </p>

            <h3 className="text-lg font-semibold text-nationals-blue mb-3">Overall Experience</h3>
            <p>
              This project strengthened my problem solving skills, improved my full stack confidence, and taught me how to build an application that feels coherent end to end.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-semibold text-nationals-blue mb-4">Contact</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              I’m excited about the opportunity to contribute to your team and bring my perspective as someone who works at the intersection of web development and AI/ML.
            </p>
            <p className="text-gray-700">
              Thank you for taking the time to review my work. I look forward to discussing how my skills and enthusiasm can support your organization.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
