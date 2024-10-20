// src/pages/About.tsx
'add client'

import React from 'react';
import { css, jsx } from '@emotion/react';
import styled from 'styled-components';
import './style.css';


const About: React.FC = () => {
  return (
    <div style={{textAlign: 'center'}}>
    <title>Contact</title>
    <br></br>
      <h1>Contact Us</h1>
      <br></br>
      <div className='blurb'>
        <p>Have questions? Contact us at our emails or send us mail!</p>
        <br></br>
      </div>
      <div className='wrapper'>
        <h2>Email us</h2>
        <br></br>
        <a href="mailto:j.k.poentis@wustl.edu">Contact Jaxon at j.k.poentis@wustl.edu</a>
        <p></p>
        <a href="mailto:a.s.luo@wustl.edu">Contact Andria at a.s.luo@wustl.edu</a>
        <br></br>
        </div>
      <section className="team">
        <div className="wrapper">
        <h2>Mailing Address</h2>
        <br></br>
          <p>6515 Wydown Blvd.</p>
          <p>St. Louis, MO 63105</p>
        </div>
        <br></br>  
      </section>
    </div>
  );
};

export default About;

