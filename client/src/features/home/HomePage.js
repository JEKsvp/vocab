import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Container, Divider, List, Paper, Typography} from "@mui/material";

import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {ListItemLink} from "../../utils/components/ListItemLink";
import {NewWordButton} from "../../utils/components/NewWordButton";
import {getCurrentUser} from "../../api/userAPI";
import SearchWord from "../words/SearchWord";
import {LeftActionMenu} from "../../utils/components/LeftActionMenu";


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

      <Card elevation={1} sx={{ mb: 4 }}>
        <CardContent>
          <SearchWord/>
        </CardContent>
      </Card>

      <Card elevation={1} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 2 }}>
            Quick Actions
          </Typography>
          <List>
            <ListItemLink 
              to={'/words-batch'} 
              title={'Word Batches'} 
              icon={<ListAltIcon fontSize={"large"} color="primary"/>}
            />
            <Divider sx={{ my: 1 }}/>
            <ListItemLink 
              to={'/to-learn'} 
              title={'Words to Learn'} 
              icon={<SchoolIcon fontSize={"large"} color="secondary"/>}
            />
            <Divider sx={{ my: 1 }}/>
            <ListItemLink 
              to={'/learned'} 
              title={'Learned Words'} 
              icon={<CheckCircleIcon fontSize={"large"} color="success"/>}
            />
          </List>
        </CardContent>
      </Card>

      <Paper 
        elevation={2}
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16, 
          display: 'flex', 
          flexDirection: 'row', 
          gap: 1,
          p: 1,
        }}
      >
        <NewWordButton/>
      </Paper>
      
      <LeftActionMenu />
    </Container>
  )
}