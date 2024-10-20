// src/pages/About.tsx
'add client'

import React from 'react';
import { css, jsx } from '@emotion/react';
import styled from 'styled-components';
import './style.css';


const About: React.FC = () => {
  return (
    <div style={{textAlign: 'center'}}>
    <title>About</title>
    <br></br>
      <h1>About Us</h1>
      <br></br><br></br>
      <p><img src="ai.jxl" alt="Picture of robot"></img></p>
      <div className='blurb'>
      <p>
        Proto.ai was designed to leverage cutting-edge AI to empower developers by simplifying the creation of server-client architectures. Our platform eliminates the guesswork that often comes with interacting with language models (LLMs), offering precise, actionable insights to design, write, and optimize code. Whether building APIs, managing data flows, or solving communication challenges, we help developers focus on innovation while ensuring seamless server-client relations.
      </p>
      </div>
      <br></br><br></br>
      <section className="team">
        <br></br>
        <div className="wrapper">
        <h2>The People</h2>
          <h3>Jaxon Poentis</h3>
          <p>uh</p>
          <h3>Andria Luo</h3>
          <p>uh</p>
        </div>
        <br></br>
        <div className='wrapper'>
            <h2>Mission Statement</h2>
            <p>Our mission is to empower developers and businesses by revolutionizing the way they design and build server-client applications. Through the use of advanced AI technology, we eliminate the guesswork associated with interacting with language models. Our platform delivers precise, actionable solutions, helping users write and refine code effortlessly, so they can focus on innovation rather than troubleshooting. We aim to simplify the complexities of backend and frontend communications, fostering seamless integrations, improved productivity, and scalable solutions for the future of software development.</p>
        </div>
        <br></br>
          
      </section>
    </div>
  );
};

export default About;

