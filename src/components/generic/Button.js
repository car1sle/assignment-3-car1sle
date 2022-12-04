import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

// Palette generated @ https://coolors.co/
export const theme = {
  start: {
    bgColor: "#44AF69",
    color: "#ffffff"
  },
  pause: {
    bgColor: "#FCAB10",
    color: "#000000"
  },
  resume: {
    bgColor: "#2B9EB3",
    color: "#ffffff"
  },
  fastForward: {
    bgColor: "#DBD5B5",
    color: "#000000"
  },
  reset: {
    bgColor: "#F8333C",
    color: "#ffffff"
  }
};

const StyledButton = styled.button`
  font-size: 17px;
  text-transform: uppercase;
  margin: 5px;
  width: 90%;
  height: 65px;
  border-radius: 5px;
  font-weight: 700;
  border: 0;
  letter-spacing: 0.5px;
  cursor: ${props => {if (!props.disabled) return 'pointer';}};
  opacity: ${props => {if (props.disabled) return '0.4';}};
  background-color: ${props => {
    if (props.value === 'Start') return props.theme.start.bgColor;
    else if (props.value === 'Pause') return props.theme.pause.bgColor;
    else if (props.value === 'Resume') return props.theme.resume.bgColor;
    else if (props.value === 'Fast Forward') return props.theme.fastForward.bgColor;
    else return props.theme.reset.bgColor;
  }};
  color: ${props => {
    if (props.value === 'Start') return props.theme.start.color;
    else if (props.value === 'Pause') return props.theme.pause.color;
    else if (props.value === 'Resume') return props.theme.resume.color;
    else if (props.value === 'Fast Forward') return props.theme.fastForward.color;
    else return props.theme.reset.color;
  }};
  transition: 0.075s;
  &:hover {
    transform: ${props => {if (!props.disabled) return 'scale(1.025)';}};
  }
`;

export const Button = ({ value, disabledValue, onClick }) => {

    return (
      <ThemeProvider theme={theme}>
        <StyledButton disabled={disabledValue} onClick={e => onClick(value)} value={value}>
          {value}
        </StyledButton>
      </ThemeProvider>
    );
  };