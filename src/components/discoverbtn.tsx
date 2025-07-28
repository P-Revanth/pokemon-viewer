import React from 'react';
import styled from 'styled-components';

// Define the types for the props that the Button component will accept
interface ButtonProps {
    buttonColor?: string; // Optional prop for the button's primary color
    onClick?: () => void; // Optional click handler
    children?: React.ReactNode; // Content inside the button, e.g., "Explore All"
}

// Define the types for the props that the StyledButton will accept
// This allows passing the buttonColor prop directly to the styled component
interface StyledButtonProps {
    $buttonColor?: string; // Using '$' prefix for transient props in styled-components
}

// Create a styled button component
const StyledButton = styled.button<StyledButtonProps>`
  line-height: 1;
  text-decoration: none;
  display: inline-flex;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 0.75rem;
  /* Use the passed prop for the background color, fallback to a default */
  background-color: ${props => props.$buttonColor || '#7808d0'};
  color: #fff;
  border-radius: 10rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  padding-left: 20px; /* Specific padding for the left side */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.3s ease-in-out; /* Added ease-in-out for smoother transition */

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    /* Use the passed prop for the icon wrapper's color, fallback to a default */
    color: ${props => props.$buttonColor || '#7808d0'};
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  /* Hover styles */
  &:hover {
    background-color: #000; /* Change to black on hover */
  }

  &:hover .button__icon-wrapper {
    color: #000; /* Change icon wrapper color to black on hover */
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  &:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  &:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }
`;

// The main Button functional component
const DiscoverButton: React.FC<ButtonProps> = ({ buttonColor = '#7808d0', onClick, children = 'Explore All' }) => {
    return (
        // StyledButton now directly accepts the buttonColor prop
        <StyledButton $buttonColor={buttonColor} onClick={onClick}>
            <span className="button__icon-wrapper">
                <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="10px" height="10px"> {/* Added height for better control */}
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                </svg>
                <svg viewBox="0 0 14 15" fill="none" width="10px" height="10px" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
                </svg>
            </span>
            {children} {/* Render children prop here */}
        </StyledButton>
    );
}

export default DiscoverButton;