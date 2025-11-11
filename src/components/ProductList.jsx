import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductForm from "./ProductForm";
import TableView from "./TableView";
import GridView from "./GridView";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/apiServices";

const ProductList = () => {
  const [view, setView] = useState("list");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = search.toLowerCase();
      setFiltered(
      products.filter(
        (data) =>
          data.name.toLowerCase().includes(query) ||
          data.category.toLowerCase().includes(query)
      )
    );
    }, 500);

    return () => clearTimeout(timer);
  }, [search, products]);

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const handleSave = async (product) => {
    try {
      let saved;
      if (product.id) {
        saved = await updateProduct(product);
        setProducts((prev) => prev.map((data) => (data.id === saved.id ? saved : data)));
        setMessage("Product updated successfully!");
      } else {
        saved = await addProduct(product);
        setProducts((prev) => [...prev, saved]);
        setMessage("Product added successfully!");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage("Error saving product!");
    } finally {
      setOpenForm(false);
      setEditProduct(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((data) => data.id !== id));
      setMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product!");
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpenForm(true);
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ py: 4 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        gap={2}
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          List of Products
        </Typography>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
          size="small"
        >
          <ToggleButton value="list">List</ToggleButton>
          <ToggleButton value="card">Card</ToggleButton>
        </ToggleButtonGroup>

        <Box display="flex" gap={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" onClick={() => setOpenForm(true)}>
            New
          </Button>
        </Box>
      </Box>

      {view === "list" ? (
        <TableView
          products={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <GridView
          products={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ProductForm
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
          setEditProduct(null);
        }}
        onSave={handleSave}
        editProduct={editProduct}
        products={products} 
      />

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setMessage("")}
          severity={message.includes("Error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductList;
