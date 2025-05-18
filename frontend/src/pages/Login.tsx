import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useAuthContext } from "../contexts/authContext";
import { useState } from "react";
import { type AuthFormData } from "../types/AuthInfo";
import { categories, ages, genders } from "../fields/filters";

type UniversalChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | { target: { value: string | string[]; name: string } };

const Login = () => {
  const { login, register } = useAuthContext();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
    position: "",
    skills: [],
    skillsToLearn: [],
    bio: "",
    avatar: "",
    pronouns: "",
    workplace: "",
    gender: "",
    age: "",
    industry: "",
  });

  const handleChange = (
    event: UniversalChangeEvent,
    _child?: React.ReactNode
  ) => {
    const { name, value } = event.target;
    console.log("handleChange", { name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    login(formData);
    event.preventDefault();
    if (isRegister) {
      register(formData);
    } else {
      const { email, password } = formData;
      login({ email, password });
    }
  };

  const renderMajors = () => {
    return categories?.map((cate) => {
      return (
        <MenuItem key={cate.id} value={cate.id}>
          {cate.category}
        </MenuItem>
      );
    });
  };

  const renderAges = () => {
    return ages.map((age) => {
      return (
        <MenuItem key={age.id} value={age.id}>
          {age.range}
        </MenuItem>
      );
    });
  };

  const renderGenders = () => {
    return genders.map((gender) => {
      return (
        <MenuItem key={gender.id} value={gender.id}>
          {gender.text}
        </MenuItem>
      );
    });
  };

  const { skills } =
    categories.find((cate) => cate.id === formData?.industry) || {};

  const skillsToLearn = skills?.filter(
    (skill) => !formData?.skills?.includes(skill.id)
  );

  return (
    <Box
      className="w-full h-screen"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper elevation={3} className="p-8 w-full max-w-md dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" className="text-gray-800 dark:text-white">
            {isRegister ? "Create new Account" : "Login"}
          </Typography>
          <Button onClick={() => setIsRegister((prev) => !prev)} size="small">
            {isRegister ? "Login" : "Create new Account"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <>
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}

          <TextField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          {isRegister && (
            <>
              <FormControl>
                <InputLabel id="demo-simple-select-helper-industry">
                  Industry
                </InputLabel>
                <Select
                  name="industry"
                  value={formData.major}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {renderMajors()}
                </Select>
              </FormControl>

              <TextField
                name="position"
                label="Position"
                value={formData.position}
                onChange={handleChange}
                fullWidth
              />

              <FormControl>
                <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="skills"
                  value={formData.skills}
                  disabled={!formData?.industry}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => {
                    // Parse id to label
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    );
                  }}
                >
                  {skills?.map((skill: any) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-multiple-chip-label">
                  Skills To Learn
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="skillsToLearn"
                  value={formData.skillsToLearn}
                  disabled={!formData?.industry}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => {
                    // Parse id to label
                    return (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    );
                  }}
                >
                  {skillsToLearn?.map((skill: any) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="bio"
                label="Bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                minRows={2}
                fullWidth
              />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Age
                  </InputLabel>
                  <Select
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {renderAges()}
                  </Select>
                </FormControl>

                <FormControl sx={{ flex: 1 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Gender
                  </InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {renderGenders()}
                  </Select>
                </FormControl>
              </Stack>
            </>
          )}

          <Button type="submit" variant="contained" color="primary">
            {isRegister ? "Register" : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
