import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

const FirstStep = ({history}) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    history.push('/second')
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 offset-md-3">
        <Form.Group controlId='first_name'>
            <Form.Label> First Name </Form.Label>
            <Form.Control
            type='text'
            name='first_name'
            placeholder="Enter your first name"
            autoComplete='off'
            ref={register({
                required: 'First name is required',
                pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Only letters are allowed for first name'
                }
            })}
            className={`${errors.first_name ? 'input-error' : ''}`}
            />
            {errors.first_name && (
                <p className="errorMsg">{errors.first_name.message}</p>
            )}
        </Form.Group>


        <Form.Group controlId='last_name'>
            <Form.Label> Last Name </Form.Label>
            <Form.Control
            type='text'
            name='last_name'
            placeholder="Enter your Last name"
            autoComplete='off'
            ref={register({
                required: 'Last name is required',
                pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Only letters are allowed for Last name'
                }
            })}
            className={`${errors.last_name ? 'input-error' : ''}`}
            />
            {errors.last_name && (
                <p className="errorMsg">{errors.last_name.message}</p>
            )}
        </Form.Group>

        <Button variant="primary" type="submit"> Next </Button>



      </div>
    </Form>
  );
};

export default FirstStep;
