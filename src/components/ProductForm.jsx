import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
} from "@mui/material";

const ProductForm = ({ open, handleClose, onSave, editProduct, products }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    tags: [],
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  // ✅ Fixed three tag options
  const tagOptions = ["accessories", "wireless", "mouse"];

  useEffect(() => {
    if (products?.length) {
      const uniqueCategories = [
        ...new Set(products.map((item) => item.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

 useEffect(() => {
  if (editProduct) {
    setForm({
      id: editProduct.id, 
      name: editProduct.name || "",
      price: editProduct.price || "",
      category: editProduct.category || "",
      stock: editProduct.stock || "",
      description: editProduct.description || "",
      tags: Array.isArray(editProduct.tags)
        ? editProduct.tags
        : editProduct.tags
        ? editProduct.tags.split(",")
        : [],
    });
  } else {
    setForm({
      id: "", 
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      tags: [],
    });
  }
}, [editProduct]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    const {
      target: { value },
    } = e;
    setForm({
      ...form,
      tags: typeof value === "string" ? value.split(",") : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.price) newErrors.price = "Price is required";
    else if (form.price <= 0) newErrors.price = "Enter a valid price";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.stock) newErrors.stock = "Stock is required";
    return newErrors;
  };

 const handleSubmit = () => {
  console.log("Submitting product:", form); 
  const validationErrors = validate();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }
  onSave({
    ...form,
    price: parseFloat(form.price),
    stock: parseInt(form.stock || 0, 10),
    tags: form.tags,
  });
};


  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
          >
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No categories found</MenuItem>
            )}
          </TextField>

          {/* ✅ Tags dropdown (multi-select) */}
          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              name="tags"
              value={form.tags}
              onChange={handleTagsChange}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Stack>
              )}
            >
              {tagOptions.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editProduct ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
