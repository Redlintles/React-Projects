import styled from "styled-components"


const StyledFooter = styled.footer`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #edf3f6;
  padding: 0 1rem;
  text-align: center;
  gap: .5rem;

  @media(min-width: 1200px) {
    padding: 0;
  }

`



const Footer = () => {
  return (
    <StyledFooter>
      <h3>Escreva sobre o que você tem interesse</h3>
      <p>Mini Blog &copy; 2023</p>
    </StyledFooter>
  )
}

export default Footer;