import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// IMPORT ICONS FROM HERE
// import {} from "@fortawesome/free-solid-svg-icons";
// import {} from "@fortawesome/free-brands-svg-icons";

// USING SOCIAL ICONS DIRECTLY WILL RENDER IT VERTICALLY
// Sizes should be xs, sm, lg, 2x, 3x and so on

const GlassyIcons = ({
  routepath,
  color,
  icon,
  iconSize,
  height,
  width,
  customPadding,
  translateY,
}) => {
  return (
    <ListIcon customPadding={customPadding}>
      <StyledLink
        customHeight={height}
        customWidth={width}
        translateY={translateY}
      >
        <FontAwesomeIcon icon={icon} color={color} size={iconSize} />
      </StyledLink>
    </ListIcon>
  );
};

// TO ARRANGE THE ICONS HORIZONTALLY ON A STRIP USE THIS COMPONENT
const GlassyIconsStrip = ({ children, flexDirection, justifycontent }) => {
  return (
    <Div>
      <WrapGlassyIcons
        flexDirection={flexDirection}
        justifycontent={justifycontent}
      >
        {children}
      </WrapGlassyIcons>
    </Div>
  );
};

const Div = styled.div``;

const WrapGlassyIcons = styled.ul`
  justify-content: ${(props) => props.justifycontent || "center"};
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  z-index: 2;
  padding-left: 0;
`;

const ListIcon = styled.li`
  cursor: pointer;
  position: relative;
  list-style: none;
  padding: 0 15px 0 15px;
  padding: ${(props) => props.customPadding || "0 15px 0 15px"};
`;

const StyledLink = styled.span`
  position: relative;
  /* width: 80px; */
  width: ${(props) => props.customWidth || "70px"};
  /* height: 80px; */
  height: ${(props) => props.customHeight || "70px"};
  display: inline-block;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 2em;
  border: 1px solid rgba(184, 110, 110, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  transition: 0.5s;
  overflow: hidden;

  border: 2px solid #fff;
  border-radius: 25px;
  box-shadow: inset 0 0 10px rgba(146, 64, 255, 0.4),
    0 0 9px 3px rgba(146, 64, 255, 0.4);

  &:hover {
    /* transform: translateY(-20px); */
    transform: translateY(${(props) => props.translateY || "-20px"});
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    transform: skewX(45deg) translateX(150px);
    transition: 0.5s;
  }

  &:hover:before {
    transform: skewX(45deg) translateX(-150px);
  }
`;

export { GlassyIcons, GlassyIconsStrip };
