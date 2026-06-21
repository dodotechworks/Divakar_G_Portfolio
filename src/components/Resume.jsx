import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <button id="btn">Download Resume</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    padding: 8px 16px;
    text-transform: uppercase;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: #ffffff80;
    background: transparent;
    cursor: pointer;
    border: 1px solid #ffffff80;
    transition: 0.5s ease;
    user-select: none;
    white-space: nowrap;
  }

  #btn:hover,
  #btn:focus {
    color: #ffffff;
    background: #008cff;
    border: 1px solid #008cff;
    text-shadow: 0 0 5px #ffffff;
    box-shadow:
      0 0 5px #008cff,
      0 0 20px #008cff,
      0 0 40px #008cff;
  }
`;

export default Button;