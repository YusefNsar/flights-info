import { LogoutRounded } from "@mui/icons-material";
import {
  Avatar,
  Dropdown,
  IconButton,
  IconButtonProps,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from "@mui/joy";
import { useCurrentUser } from "../../core/auth";
import { useLogout } from "../../hooks/auth/useLogout";

export function UserAvatarButton(props: UserAvatarButtonProps): JSX.Element {
  const { sx, ...other } = props;
  const user = useCurrentUser()!;
  const logout = useLogout();

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            sx: { borderRadius: "50%", p: "2px", ...sx },
            ...other,
          },
        }}
      >
        <Avatar sx={{ width: 36, height: 36 }} alt={user.name} />
      </MenuButton>

      <Menu size="sm">
        <MenuItem onClick={logout}>
          <ListItemDecorator sx={{ ml: 0.5 }}>
            <LogoutRounded />
          </ListItemDecorator>
          <ListItemContent sx={{ mr: 2 }}>Logout</ListItemContent>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export type UserAvatarButtonProps = Omit<IconButtonProps, "children">;
