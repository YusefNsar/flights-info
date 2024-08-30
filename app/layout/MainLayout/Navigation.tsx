import { Dashboard } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListProps,
} from "@mui/joy";
import { ReactNode, memo } from "react";
import { Link, useMatch } from "react-router-dom";

export const Navigation = memo(function Navigation(
  props: NavigationProps,
): JSX.Element {
  const { sx, ...other } = props;

  return (
    <List
      sx={{ "--ListItem-radius": "4px", ...sx }}
      size="sm"
      role="navigation"
      {...other}
    >
      <NavItem path="/dashboard" label="Dashboard" icon={<Dashboard />} />
    </List>
  );
});

function NavItem(props: NavItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        selected={!!useMatch(props.path)}
        to={props.path}
        aria-current="page"
      >
        <ListItemDecorator children={props.icon} />
        <ListItemContent>{props.label}</ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

type NavigationProps = Omit<ListProps, "children">;
type NavItemProps = {
  path: string;
  label: string;
  icon: ReactNode;
};
