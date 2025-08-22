import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Container, Divider, List, Paper, Typography} from "@mui/material";

import ReplayIcon from '@mui/icons-material/Replay';
import Replay30Icon from '@mui/icons-material/Replay30';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {ListItemLink} from "../../utils/components/ListItemLink";
import {NewWordButton} from "../../utils/components/NewWordButton";
import {getCurrentUser} from "../../api/userAPI";
import SearchWord from "../words/SearchWord";
import {SwitchLanguageButton} from "../../utils/components/SwitchLanguageButton";
import {LogoutButton} from "../../utils/components/LogoutButton";


export const HomePage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getCurrentUser()
      .then(result => setUser(result))
      .catch(ex => console.error(ex))
  }, [])
  
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
          Vocabulary Learning
        </Typography>
        {user && (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back, {user.name || 'Learner'}!
          </Typography>
        )}
      </Box>

      <Card sx={{ mb: 4, elevation: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            Search Words
          </Typography>
          <SearchWord/>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, elevation: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <List sx={{ 
            '& .MuiListItem-root': {
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }
          }}>
            <ListItemLink 
              to={'/words-batch'} 
              title={'Word Batches'} 
              icon={<ListAltIcon fontSize={"large"} color="primary"/>}
            />
            <Divider sx={{ my: 1 }}/>
            <ListItemLink 
              to={'/to-learn'} 
              title={'Words to Learn'} 
              icon={<ReplayIcon fontSize={"large"} color="secondary"/>}
            />
            <Divider sx={{ my: 1 }}/>
            <ListItemLink 
              to={'/learned'} 
              title={'Learned Words'} 
              icon={<Replay30Icon fontSize={"large"} color="success"/>}
            />
          </List>
        </CardContent>
      </Card>

      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1,
          p: 1,
          borderRadius: 2,
          elevation: 3
        }}
      >
        <NewWordButton/>
        <SwitchLanguageButton/>
        <LogoutButton/>
      </Paper>
    </Container>
  )
}