import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getCookiesByName } from "../utils/formUtils.js";

export const NewProduct = () => {
  const token = getCookiesByName("jwtCookie");
  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      thumbnail: [],
      code: 0,
      stock: 0,
      category: "",
    },
    onSubmit: async (datos) => {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.status == 200) {
        console.log(await response.json());
        await response.json();
      }
      console.log(datos);
    },
  });
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" onChange={handleChange} name="title" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" onChange={handleChange} name="description" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="price" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Thumbnail</Form.Label>
        <Form.Control type="text" onChange={handleChange} name="thumbnail" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Code</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="code" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" onChange={handleChange} name="stock" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" onChange={handleChange} name="category" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
