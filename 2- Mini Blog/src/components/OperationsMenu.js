import React, { useRef } from 'react'
import styled from 'styled-components'


const OperationsDeck = styled.div`
  position: relative;

  .operations__menu {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-50%,-100%);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #aaa;
    gap: 0;
    visibility: visible;
    opacity: 1;
    transition: opacity .5s ease, visibility .5s ease;
  }
  @media(min-width: 1200px) {
    .operations__menu {
      transform: translate(100%,-100%);
    }
  }
`

const AbstractButton = styled.button`
  border: none;
  padding .5rem 1rem;
  cursor: pointer;
  outline: none;
  margin: 0;
`

const OperationsMenu = ({ deleteFn, editFn }) => {

  const menuRef = useRef();

  function toggleMenu() {
    menuRef.current.classList.toggle("invisible")
  }

  function menuDismiss(e) {
    e.target.classList.toggle("invisible");
  }

  // () => { deleteComment(data) }
  // ()=> {setShowEdit(true); toggleMenu()}



  return (
    <OperationsDeck className="operations__deck">
      <AbstractButton
        className="operations__toggler"
        onClick={toggleMenu}
      >
        <i className="fas fa-ellipsis-vertical"></i>
      </AbstractButton>
      <div
        className="operations__menu invisible"
        onClick={menuDismiss}
        ref={menuRef}
      >
        <AbstractButton onClick={deleteFn}>Excluir</AbstractButton>
        <AbstractButton onClick={editFn}>Editar</AbstractButton>
      </div>
    </OperationsDeck>
  )
}

export default OperationsMenu