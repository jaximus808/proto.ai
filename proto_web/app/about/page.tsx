import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 font-[family-name:var(--font-geist-sans)]" >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">About Proto.ai</h1>
      </header>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">What is Proto.ai?</h2>
        <p className="text-white">
          Proto.ai is an innovative platform that empowers users to create diagrams easily. 
          Leveraging cutting-edge generative AI technology, Proto.ai transforms these diagrams 
          into fully functional full-stack code, streamlining the development process.
        </p>

        <h2 className="text-2xl font-semibold text-white">How Does It Work?</h2>
        <p className="text-white">
          Users can design their applications visually using our intuitive diagramming tool. 
          Once the design is complete, Proto.ai’s AI analyzes the diagram and generates the 
          corresponding code, allowing developers to focus on what matters most—building amazing products.
        </p>

        <h2 className="text-2xl font-semibold text-white">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-white">
          <li>User-friendly diagram creation interface</li>
          <li>Generative AI that translates diagrams into code</li>
          <li>Supports full-stack development</li>
          <li>Real-time collaboration with team members</li>
          <li>Export options for various programming languages</li>
        </ul>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-2xl font-bold"
          href="/"
          rel="noopener noreferrer"
        >
         
         {">>> Get Started"}
        </a>
      </section>
    </div>
  );
};

export default About;