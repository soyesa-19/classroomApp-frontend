import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  FormCard,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  LinkText,
  StyledLink,
  ErrorMessage,
} from "../../components/styles/Auth.styled";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (emailRef.current?.value && passwordRef.current?.value) {
      setLoading(true);
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        navigate("/");
      } catch (error) {
        let errorMessage = "Login Failed! Something went wrong";

        if (error instanceof Error) {
          errorMessage = error?.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        }
        setError("Oops!" + errorMessage);
      } finally {
        setLoading(false);
      }
      setLoading(false);
    } else {
      setError("PLease check the credentials");
    }
  };

  return (
    <PageContainer>
      <FormCard>
        <Title>Log In</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        <LinkText>
          Don't have an account?{" "}
          <StyledLink to="/register">Register now</StyledLink>
        </LinkText>
      </FormCard>
    </PageContainer>
  );
};

export default Login;
