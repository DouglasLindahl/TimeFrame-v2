import { useState } from "react";
import styled from "styled-components";
import colors from "../../../theme";
import showIcon from "../../../public/view-black.png";
import hideIcon from "../../../public/hide-black.png";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${colors.text};
  border-radius: 64px;
  font-size: 16px;
  transition: border-color 0.3s ease, padding-top 0.3s ease;
  background: transparent;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
  &:hover {
    border-color: ${colors.primary};
  }

  &:focus + label,
  &:not(:placeholder-shown) + label,
  &:hover + label {
    top: 4px;
    background none;
    padding: 8px;
    font-size: 12px;
    color: ${colors.primary};
    background-color: ${colors.white};
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${colors.text};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
  }
`;

type InputType = "text" | "email" | "password" | "number" | "tel" | "url";

interface InputFieldProps {
  label: string;
  type?: InputType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <InputContainer>
      <StyledInput
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        placeholder=" "
      />
      <FloatingLabel>{label}</FloatingLabel>

      {isPassword && (
        <ToggleButton
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <img
            src={showPassword ? showIcon.src : hideIcon.src}
            alt="Toggle Password"
          />
        </ToggleButton>
      )}
    </InputContainer>
  );
};

export default InputField;
