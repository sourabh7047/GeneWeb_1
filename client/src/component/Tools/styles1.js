import styled from "styled-components";

const Formbody = styled.div`
  margin: 2em;
  padding: 1em;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  overflow-y: auto;
  height: 40rem;

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  label {
    display: block;
    margin-top: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  textarea {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const QueryStyle = {
  margin: "1rem",
  padding: "0.8rem 1.2rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "#0056b3",
  },
};

const FormCard = styled.div`
  margin: 2rem;
  padding: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const Outform = styled.div`
  padding: 2rem;
  margin: 2rem;
  border-radius: 12px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 24px;
  overflow-y: auto;
  max-height: 80vh;
`;

const SubmitButtonAlign = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const PuffFit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Modli = styled.li`
  padding: 0.5rem 1rem;
  text-align: center;
  list-style: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Modul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export {
  Formbody,
  QueryStyle,
  FormCard,
  Wrapper,
  Outform,
  SubmitButtonAlign,
  PuffFit,
  Modli,
  Modul,
};