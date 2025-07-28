import React from 'react';
import styled from 'styled-components';

// Define the types for the props that the Button component will accept
interface ButtonProps {
    onClick?: () => void; // Optional click handler for the button
    children?: React.ReactNode; // Optional content inside the button (e.g., "Back" text)
}

// Create a styled button component
const StyledButton = styled.button`
    margin: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: #000000; /* Default text color */
  display: flex;
  height: 3em;
  width: 200px;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee4b; /* Original translucent background */
  border-radius: 3px;
  letter-spacing: 1px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: none;
  background: #fff; /* Solid white background */
  
  /* Styling for the SVG icon directly inside the button */
  & > svg {
    margin-right: 5px;
    margin-left: 5px;
    font-size: 30px; /* This will affect the SVG size if it's not explicitly set by width/height */
    transition: all 0.4s ease-in;
  }

  /* Hover effect for the SVG icon */
  &:hover > svg {
    /* Using a fixed pixel size for font-size might be more predictable than em here */
    /* font-size: 1.2em; */
    transform: translateX(-5px);
  }

  /* Hover effect for the button itself */
  &:hover {
    box-shadow: 5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff; /* Enhanced shadow on hover */
    transform: translateY(-1px); /* Slight lift effect on hover */
  }
`;

// The main Button functional component
const BackButton: React.FC<ButtonProps> = ({ onClick, children = 'Back to pokedex' }) => {
    return (
        <StyledButton onClick={onClick}>
            {/* SVG icon */}
            <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z" fill="currentColor" />
            </svg>
            <span>{children}</span> {/* Render the children prop here */}
        </StyledButton>
    );
}

export default BackButton;