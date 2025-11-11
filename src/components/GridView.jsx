import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GridView = ({ products, onEdit, onDelete }) => (
  <Grid container spacing={3} sx={{display: 'flex', justifyContent: 'center'}}>
    {products.map((data) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            width: "250px",
            height: "100%",
            data: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {data.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {data.category}
            </Typography>
            <Typography>{data.tags && data.tags.length > 0 ? data.tags[0] : "-"}</Typography>
            <Typography mt={1}>Price: ${data.price}</Typography>
            <Typography>Stock: {data.stock}</Typography>
            <Typography variant="body2" color="text.secondary" mt={1}
            
            >
              {data.description || "-"}
            </Typography>

            <Box display="flex" justifyContent="space-between" gap={1} mt={2}>
              <IconButton color="primary" onClick={() => onEdit(data)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(data.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default GridView;
