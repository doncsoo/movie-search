import { List, ListItem, ListItemText } from "@mui/material";

function CrewList(props) {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {props.crew.map((member) => (
        <ListItem key={member.id}>
          <ListItemText
            primary={member.person.name}
            secondary={member.role.character}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default CrewList;
