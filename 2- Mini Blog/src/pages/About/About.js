import { Link } from "react-router-dom";
import styled from "styled-components";


const AboutSection = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;

  & > h2 {
    margin: 2rem 0;
  }

  & > p {
    color: #aaa;
    margin-bottom: 2rem;
  }

  & > a {
    display: block;
    margin-top: 15px;
    padding: 10px 15px;
  }



`

const About = () => {
  return (
    <AboutSection>
      <h2>Sobre o Mini <span>Blog</span></h2>

      <p>Este Projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>

      <Link to="/posts/createPost" className="btn">
        Criar Post
      </Link>
    </AboutSection>
  )
}

export default About