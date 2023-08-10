import { useForm } from "@mantine/form";
import { TextInput, Box, Button } from "@mantine/core";
import axios from "axios";

interface FormValues {
  email: string;
  password: string;
}

function SignupPage() {
  const form = useForm<FormValues>({
    initialValues: { email: "", password: "" },
  });

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3333/auth/signup", {
        email: form.values.email, // Assuming your backend endpoint uses 'email' field
        password: form.values.password, // Assuming your backend endpoint uses 'password' field
      });

      console.log("Signup successful:", response.data);
      // Handle success, e.g., show success message or redirect
    } catch (error) {
      console.error("Signup failed");
      // Handle error, display error message to user
    }
  };

  return (
    <Box w={400} mx="auto">
      <h1>Register</h1>
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

      <Button onClick={handleSignup} color="blue" fullWidth>
        Sign Up
      </Button>
    </Box>
  );
}

export default SignupPage;
