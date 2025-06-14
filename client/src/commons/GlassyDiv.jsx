import styled from "styled-components";

const GlassDiv = styled.div`
  position: relative;
  /* width: 80px; */
  width: ${(props) => props.width || "50px"};
  /* height: 80px; */
  height: ${(props) => props.height || "50px"};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  backdrop-filter: blur(2px);
  overflow: hidden;
  background: rgba(255, 255, 255, 0);
  margin: ${(props) => props.margin || "0px"};
  text-align: center;
  line-height: 50px;
  font-family: sans-serif;
  font-size: 2rem;

  @media (max-width: 475px) {
    height: ${(props) => props.mediaHeight || "6.8rem !important;"};
    width: ${(props) => props.mediaWidth || "6.8rem !important;"};
    font-size: 1.8rem;
  }

  border: 2px solid #fff;
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2),
    0 0 9px 3px rgba(255, 255, 255, 0.2);
`;

export default GlassDiv;
