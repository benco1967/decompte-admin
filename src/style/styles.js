import styled from "styled-components";

export const mainColor = "#600060";
export const lightColor = "#a800a8";
export const bkgColor = "#ffffff";
export const inputColor = "#f8f8f8";
export const inputFocusColor = "#e8e8e8";

export const H1 = styled.h1`
  font-size: 1.75rem;
  padding: 1rem;
  margin-left: -1rem;
  width: 100%;
  text-align: center;
  color: ${bkgColor};
  background-color: ${mainColor};
`;
export const TabBar = styled.div`
  width: 100%;
  display: flex;
`;
export const TabBody = styled.div`
  margin: 0.5rem;
`;
export const Tab = styled.div`
  flex: 1;
  font-size: 1.1rem;
  text-align: center;
  padding: 0.25rem;
  font-weight: ${props => (props.selected ? 900 : 500)};
  color: ${props => (props.selected ? bkgColor : mainColor)};
  background-color: ${props => (props.selected ? mainColor : bkgColor)};
  border: 1px solid ${mainColor};
`;
export const Button = styled.button`
  outline-style: none;
  background-color: ${props => (props.primary ? mainColor : bkgColor)};
  color: ${props => (props.primary ? bkgColor : mainColor)};
  font-size: 1.25rem;
  margin: 0.25rem;
  padding: 0.25rem 1rem;
  border: 2px solid ${mainColor};
  &:active {
    background-color: ${props => (props.primary ? lightColor : inputColor)};
  }
`;
export const Field = styled.div`
  margin: 0.25rem;
`;
export const Label = styled.label`
  font-size: 1.1rem;
  color: ${mainColor};
`;
export const Input = styled.input`
  outline-style: none;
  color: ${mainColor};
  font-size: 1.1rem;
  padding: 0.25rem;
  border: unset;
  border-bottom: 1px solid ${mainColor};
  &:focus {
    border-top: 1px solid ${inputFocusColor};
    border-left: 1px solid ${inputFocusColor};
    border-right: 1px solid ${inputFocusColor};
    background-color: ${inputColor};
  }
`;
export const A = styled.a`
  margin: 0.25rem;
  font-size: 1.25rem;
  color: ${mainColor};
`;
