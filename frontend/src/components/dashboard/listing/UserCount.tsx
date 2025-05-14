import { Typography } from "@mui/material";
import { useSearchContext } from "../../../contexts/searchContext";

const UserCount = () => {
  const { users } = useSearchContext();
  return <Typography variant="h6">{users.length} users found</Typography>;
};

export default UserCount;
