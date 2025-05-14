import { Stack } from "@mui/material";
import banner from "../assets/banner.svg";
import MasterLayout from "./index";
import FilterSideBar from "../components/dashboard/filter-sidebar/index";
import UserList from "../components/dashboard/listing/UserList";
import UserCount from "../components/dashboard/listing/UserCount";

const Dashboard = () => {
  return (
    <MasterLayout>
      <img src={banner} />
      <Stack
        direction="row"
        justifyContent="space-between"
        px={10}
        my={5}
        gap={4}
      >
        <FilterSideBar />
        <Stack direction="column" flex={1} gap={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="cneter"
          >
            <UserCount />
          </Stack>
          <UserList />
        </Stack>
      </Stack>
    </MasterLayout>
  );
};
export default Dashboard;
