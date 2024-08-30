import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "../../hooks/auth/useRegister";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  name: HTMLInputElement;
}
interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const Register = () => {
  const [registerUser, isLoading] = useRegister();

  const handleSubmit = (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
      name: formElements.name.value,
    };

    registerUser([data.name, data.email, data.password]);
  };

  return (
    <>
      <Stack sx={{ gap: 4, mb: 2 }}>
        <Stack sx={{ gap: 1 }}>
          <Typography component="h1" level="h3">
            Sign up
          </Typography>
          <Typography level="body-sm">
            Already have an account?{" "}
            <Link level="title-sm">
              <RouterLink to="/login">Sign in!</RouterLink>
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Divider
        sx={(theme) => ({
          [theme.getColorSchemeSelector("light")]: {
            color: { xs: "#FFF", md: "text.tertiary" },
          },
        })}
      >
        or
      </Divider>
      <Stack sx={{ gap: 4, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <FormControl required>
            <FormLabel>Name</FormLabel>
            <Input type="name" name="name" />
          </FormControl>
          <FormControl required>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>

          <Stack sx={{ gap: 4, mt: 4 }}>
            <Button type="submit" fullWidth loading={isLoading}>
              Sign up
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export const Component = Register;
