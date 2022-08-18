import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  AccordionActions,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

function ExpansionPanel(props) {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.content}
      </AccordionDetails>
      <AccordionActions>{props.action}</AccordionActions>
    </Accordion>
  );
}

export default ExpansionPanel;
