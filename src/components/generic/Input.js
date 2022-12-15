import styled from 'styled-components';

const StyledInputContainer = styled.div`
  margin: 10px 15px;
  font-size: 20px;
  display: inline-block;
`;

const StyledInput = styled.input`
  font-family: 'Roboto Mono', monospace;
  width: ${props => {
    if (props.label === 'R') return '60px';
    else return '80px';
  }};
  font-size: 20px;
`;

const Input = ({ value, onChange, label }) => {

    return (
        <StyledInputContainer>
            <StyledInput type="number" min="0" value={value} onChange={onChange} label={label} />
            {/* If the input is to set the number of rounds, do not show the label next to it */}
            {label !== "R" && ` ${label}`}
        </StyledInputContainer>
    );
  };
  
  export default Input;