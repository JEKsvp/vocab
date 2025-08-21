import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import PropTypes from "prop-types";


export const ListItemLink = (props) => {
  const {icon, title, to} = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined}/>;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={
          <Typography variant="h4">{title}</Typography>
        }/>
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
};