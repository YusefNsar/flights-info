import MenuIcon from "@mui/icons-material/Menu";
import { Box, BoxProps, Button, IconButton } from "@mui/joy";
import { Fragment, Suspense } from "react";
import { Link } from "react-router-dom";
import { ColorSchemeToggle } from "../../components/common/ColorSchemeToggle";
import { UserAvatarButton } from "../../components/common/UserAvatarButton";
import { useCurrentUser } from "../../core/auth";
import { toggleSidebar } from "./Sidebar";

export function Toolbar(props: ToolbarProps): JSX.Element {
  const { sx, forceHide, ...other } = props;

  return (
    <Box
      sx={{
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "divider",
        display: "flex",
        gap: 1,
        px: 2,
        py: 0.5,
        ...sx,
      }}
      component="header"
      {...other}
    >
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
        sx={{ display: forceHide ? {} : { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} component="span" />

      <Suspense>
        <ActionButtons />
      </Suspense>
    </Box>
  );
}

function ActionButtons(): JSX.Element {
  const user = useCurrentUser();

  return (
    <Fragment>
      <ColorSchemeToggle />

      {user ? (
        <UserAvatarButton variant="soft" />
      ) : (
        <Button component={Link} size="sm" to="/login">
          Sign In
        </Button>
      )}
    </Fragment>
  );
}

type ToolbarProps = Omit<BoxProps<"header">, "children"> & {
  forceHide?: boolean;
};
