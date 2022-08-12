import styled from "styled-components";

const Submit = styled.button.attrs(props=>({
  type: 'submit',
  disabled: props.isInvalid
}))`
 
  color: #090909;
  margin: 10px 20px;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:hover {
    border: 1px solid white;
  }

  &:active {
    box-shadow: 4px 4px 12px #c5c5c5, -4px -4px 12px #ffffff;
  }
`;

export default Submit;