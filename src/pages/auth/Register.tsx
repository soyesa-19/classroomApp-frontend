import { useRef, useState, FormEvent } from "react";
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
  SuccessMessage,
} from "../../components/styles/Auth.styled";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register } = useAuth();

  const validateForm = () => {
    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      setError("Passwords do not match");
      return false;
    }

    if (passwordRef?.current?.value && passwordRef?.current?.value.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (validateForm()) {
        await register({
          firstName: firstNameRef?.current?.value ?? "",
          lastName: lastNameRef?.current?.value ?? "",
          email: emailRef?.current?.value ?? "",
          password: passwordRef?.current?.value ?? "",
        });
        navigate("/login");
      }
    } catch (error) {
      let errorMessage = "Register Failed! Something went wrong";

      if (error instanceof Error) {
        errorMessage = error?.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormCard>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              ref={firstNameRef}
              placeholder="Enter your first name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              ref={lastNameRef}
              placeholder="Enter your last name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="registerEmail">Email Address</Label>
            <Input
              id="registerEmail"
              type="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="registerPassword">Password</Label>
            <Input
              id="registerPassword"
              type="password"
              ref={passwordRef}
              placeholder="Create a password"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              ref={confirmPasswordRef}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>

        <LinkText>
          Already have an account? <StyledLink to="/login">Log in</StyledLink>
        </LinkText>
      </FormCard>
    </PageContainer>
  );
};

export default Register;
