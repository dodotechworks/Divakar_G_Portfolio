import React from 'react';
import * as styledComponents from "styled-components";

const styled = styledComponents.default || styledComponents;

const Button = () => {
  return (
    <StyledWrapper>
      <button className="Btn">
        <div className="sign">
          <svg fill="white" className="svgIcon" xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 448 512">
            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
          </svg>
        </div>
        <div className="text">Linkedln</div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    background-color: #0a66c2;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .sign {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .sign svg {
    width: 18px;
    height: 18px;
  }

  .sign svg path {
    fill: white;
  }

  .text {
    position: absolute;
    right: 0;
    width: 0;
    opacity: 0;
    color: white;
    font-size: 0.85rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .Btn:hover {
    width: 105px;
    border-radius: 24px;
  }

  .Btn:hover .sign {
    width: 30%;
    padding-left: 8px;
  }

  .Btn:hover .text {
    width: 70%;
    opacity: 1;
    padding-right: 8px;
  }

  .Btn:active {
    transform: scale(0.96);
  }
`;

export default Button;
