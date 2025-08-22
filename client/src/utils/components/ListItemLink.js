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
      <ListItem 
        button 
        component={renderLink}
        sx={{
          borderRadius: 2,
          mb: 1,
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'translateX(4px)',
            transition: 'all 0.2s ease-in-out'
          },
          '&:active': {
            backgroundColor: 'action.selected'
          },
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          '&:hover .MuiListItemIcon-root': {
            transform: 'scale(1.1)',
            transition: 'transform 0.2s ease-in-out'
          }
        }}
      >
        {icon ? (
          <ListItemIcon sx={{ 
            minWidth: 48,
            transition: 'transform 0.2s ease-in-out'
          }}>
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText 
          primary={
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary'
              }}
            >
              {title}
            </Typography>
          }
        />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
};