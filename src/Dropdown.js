import React from "react";
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton
} from "./style.js";

export function Dropdown(props) {
  return (
    <DropdownWrapper action={props.action} onChange={props.onChange} onSubmit={props.onSubmit}>
      <StyledLabel htmlFor="fnames">{props.formLabel}</StyledLabel>
      <StyledSelect id="fname" name="fname" value={props.value}>
        {props.children}
      </StyledSelect>
      { <StyledButton type="submit" value={props.buttonText} /> }
    </DropdownWrapper>
  );
}

export function Option(props) {
  return <StyledOption selected={props.selected}>{props.value}</StyledOption>;
}
