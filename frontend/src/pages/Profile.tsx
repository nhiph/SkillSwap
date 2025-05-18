import { Box, Paper, Stack, Typography } from "@mui/material";
import MasterLayout from ".";
import ProfileCard from "../components/details/ProfileCard";
import ProfileDetails from "../components/details/ProfileDetails";
import { useAuthContext } from "../contexts/authContext";

const Profile = () => {
  return (
    <MasterLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
        className="mx-20"
        sx={{
          borderRadius: '20px'
        }}
      >
        {/* left */}
        <Stack
          sx={{
            background: '#63b2db'
          }}
        >
          <ProfileCard />
        </Stack>
        {/* right */}
        <Stack
          direction="column"
          justifyContent="flex-start"
          gap={2}
          flex={1}
          bgcolor="#63b2db38"
        >
          <Stack>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="#1d7da8"
              mb={2}
              mt={2}
            >
              About
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              esse aliquam, voluptatem voluptate dicta praesentium temporibus
              aspernatur quaerat unde corporis quibusdam animi sunt, impedit
              atque eum aperiam ea eaque dolorum!
            </Typography>
          </Stack>
          {/* skills & experiences */}
          <Stack>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="#1d7da8"
              mb={2}
              mt={2}
            >
              About
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              esse aliquam, voluptatem voluptate dicta praesentium temporibus
              aspernatur quaerat unde corporis quibusdam animi sunt, impedit
              atque eum aperiam ea eaque dolorum!
            </Typography>
          </Stack>
          {/* connections */}
          <Stack>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="#1d7da8"
              mb={2}
              mt={2}
            >
              About
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              esse aliquam, voluptatem voluptate dicta praesentium temporibus
              aspernatur quaerat unde corporis quibusdam animi sunt, impedit
              atque eum aperiam ea eaque dolorum!
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </MasterLayout>
  );
};

export default Profile;
