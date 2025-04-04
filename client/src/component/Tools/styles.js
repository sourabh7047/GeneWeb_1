import styled from "styled-components";

const Formbody = styled.div`
  margin: 20px;
  width: 95%;
  overflow-y: auto;
  height: 35rem;
`;

const QueryStyle = {
  margin: "10px ",
  backgroundColor: "#567FC3",
  width: "10rem",
};

const CodonQuery = {
  ...QueryStyle,
  width: "37rem",
  marginTop: "40px",
};

const FormCard = styled.div`
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Outform = styled.div`
  padding: 1.2rem;
  margin: 50px;
  height: 700px;
  width: 700px;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.7) 2px 8px 15px;
  overflow-y: scroll;
`;

const SubmitButtonAlign = styled.div`
  display: flex;
  justify-content: center;
  // position: absolute;
  // bottom: 20px;
  // left: 11.5rem;
`;

const PuffFit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Modli = styled.li`
  text-align: center;
  list-style: none;
  margin-left: -2em;
  &:hover {
    background: #808080;
  }
`;

const Modul = styled.ul`
  list-style-position: inside;
`;

export {
  Formbody,
  QueryStyle,
  FormCard,
  Wrapper,
  Outform,
  SubmitButtonAlign,
  PuffFit,
  CodonQuery,
  Modli,
  Modul,
};

