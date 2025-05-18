import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {
  RiArrowDropDownFill,
  RiArrowDropUpFill,
  RiNotification2Line,
} from "@remixicon/react";
import Badge from "@mui/material/Badge";
import { useAuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const { user, logout } = useAuthContext();

  const [avatarEl, setAvatarEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [invisible, setInvisible] = React.useState(false);

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const [notifyEl, setNotifyEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const handleNotifyOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNotifyEl(e.currentTarget);
    if (!invisible) {
      handleBadgeVisibility();
    }
  };

  const handleNotifyClose = () => {
    setNotifyEl(null);
  };

  const open = Boolean(avatarEl);
  const id = open ? "simpe-popover" : undefined;

  const notifyOpen = Boolean(notifyEl);
  const notifyId = notifyOpen ? "simpe-notify" : undefined;
  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Button aria-describedby={id} onClick={handleNotifyOpen}>
          <Badge
            color="warning"
            overlap="circular"
            badgeContent="1"
            invisible={invisible}
            showZero={true}
          >
            <RiNotification2Line size={36} className="my-icon" />
          </Badge>
        </Button>
        <Button aria-describedby={id} onClick={handleAvatarClick}>
          <Avatar src={user?.avatar} />
          {open ? (
            <RiArrowDropUpFill size={36} className="my-icon" />
          ) : (
            <RiArrowDropDownFill size={36} className="my-icon" />
          )}
        </Button>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List disablePadding>
          <Link to="/profile">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Your Profile" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      <Popover
        id={notifyId}
        open={notifyOpen}
        anchorEl={notifyEl}
        onClose={handleNotifyClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List
          disablePadding
          sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText
                primary={`You have a request from ${"Nhi Phung"}`}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={`You have a request from ${"Binh Cao"}`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default AccountSettings;
