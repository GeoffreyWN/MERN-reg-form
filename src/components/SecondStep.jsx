import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";


const SecondStep = ({history, updateUser, user}) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
        email: user.email,
        password: user.password
    }
});

  const onSubmit = (data) => {
    console.log(data);
    updateUser(data)
    history.push('/third')
  };
  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }} className="col-md-6 offset-md-3">
        <Form.Group controlId="email">
          <Form.Label> Email </Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter your email"
            autoComplete="off"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not  valid",
              },
            })}
            className={`${errors.email ? "input-error" : ""}`}
          />
          {errors.email && (
            <p className="errorMsg">{errors.email.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label> Password </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Choose Password"
            autoComplete="off"
            ref={register({
              required: "Password is required",
              minLength: {
                value: 6,
                message: "A minimum of 6 characters  is required",
              },
            })}
            className={`${errors.password ? "input-error" : ""}`}
          />
          {errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit"> Next </Button>
      </motion.div>
    </Form>
  );
};

export default SecondStep;
