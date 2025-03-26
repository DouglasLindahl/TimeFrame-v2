"use client";
import { useState, FormEvent, useEffect } from "react";
import supabase from "../../../supabase";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import backgroundImage from "../../../public/backgroundImage.jpg";
import showIcon from "../../../public/show.png";
import hideIcon from "../../../public/hide.png";
import colors from "../../../theme";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${backgroundImage.src}) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  image-rendering: crisp-edges;
  color: ${colors.white};
  font-weight: 400;
  font-size: 16px;
`;

const FormWrapper = styled.div`
  gap: 32px;
  background: rgba(255, 255, 255, 0);
  padding: 32px;
  width: 30vw;
  border-radius: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgb(255, 255, 255, 0.5);

  & form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${colors.white};
  border-radius: 32px;
  padding: 16px;
  box-sizing: border-box;
  background: none;
  color: ${colors.white};
  &::placeholder {
    color: ${colors.white};
  }
`;

const EyeIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${colors.white};
  color: ${colors.text};
  border: none;
  border-radius: 32px;
  cursor: pointer;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid ${colors.white};
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background: none;
    color: ${colors.white};
  }
`;

const ExtraLinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  color: ${colors.white};
  & div {
    display: flex;
    gap: 8px;
    & input {
      width: 14px;
      height: 14px;
      background-color: ${colors.white};
      border-radius: 2px;
    }
    & input:hover {
      cursor: pointer;
    }
    & label:hover {
      cursor: pointer;
    }
  }
`;

const RegisterLink = styled.p``;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = supabase.auth.getSession();
      if (session) {
        if ((await session).data.session != null) {
          router.push("/dashboard");
        }
      }
    };
    checkUserSession();
  }, [router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h1>Login</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          {/* Password input with custom eye icon for visibility toggle */}
          <InputWrapper>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <EyeIcon
              src={isPasswordVisible ? showIcon.src : hideIcon.src}
              alt={isPasswordVisible ? "Hide password" : "Show password"}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </InputWrapper>

          {/* Remember Me and Forgot Password */}
          <ExtraLinksWrapper>
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </ExtraLinksWrapper>

          <Button type="submit">Log In</Button>

          {/* Register Link */}
          <RegisterLink>
            <a href="/register">Register</a>
          </RegisterLink>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Login;
