import { useForm } from "@mantine/form";
import { TextInput, Checkbox, Box, Button } from "@mantine/core";
import axios from "axios";
import cookie from "js-cookie";

interface FormValues {
  email: string;
  password: string;
}

function LoginPage() {
  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3333/auth/signin", {
        email: form.values.email, // Assuming your backend endpoint uses 'email' field
        password: form.values.password, // Assuming your backend endpoint uses 'password' field
      });

      const accessToken = response.data.access_token;

      // Store the access token in a cookie
      cookie.set("access_token", accessToken, {
        expires: 0.01047,
        secure: true,
        sameSite: "lax",
      });

      console.log("Logged in:", response.data);
      // Handle success, e.g., redirect to another page
    } catch (error) {
      console.error("Login failed");
      // Handle error, display error message to user
    }
  };

  return (
    <Box w={400} mx="auto">
      <h1>Login</h1>
      <TextInput
        label="Email"
        placeholder="Email"
        {...form.getInputProps("email")}
      />
      <TextInput
        // mt="0"
        mb="md"
        label="Password"
        type="password"
        placeholder="Password"
        {...form.getInputProps("password")} // Assuming your form supports password
      />

      <Button onClick={handleLogin} color="blue" fullWidth>
        Login
      </Button>
    </Box>
  );
}

export default LoginPage;
