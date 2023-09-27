import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import FormikControl from "../form/FormikControl";
import ModalCenter from "../Modal";
import AddButton from "../Task/AddButton";
import { AuthContext } from "../../context/UserContext";
import { TaskContext } from "../../context/TasksContext";
import { Spinner } from "react-bootstrap";
import { initialValues, onSubmit, validationSchema } from "./core";



const AddCategory = ({className}) => {
  const { currentUser } = useContext(AuthContext);
  const {setCatergories}=useContext(TaskContext)
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <AddButton
        onClick={() => setShow(true)}
        title="Add new"
        className={`pointer add-cate  ${className}`}
      />
      <ModalCenter title="Add Category" show={show} setShow={setShow}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, setErr, setLoading,setShow ,currentUser.uid,setCatergories)
          }
        >
              <Form className="row col-10 d-flex justify-content-center ms-5">
                <FormikControl
                  control="input"
                  type="text"
                  name="title"
                  placeholder="insert category title"
                />
                <FormikControl
                  control="input"
                  type="color"
                  name="color"
                />
                <button type="submit" className="btn submit mt-4 col-10 color-white">Add {loading&& <Spinner animation="border" role="status" size="sm"/>}</button>
              </Form>
           
        </Formik>
        {err&&<span className="color-war">Somthings done wrong </span>}
      </ModalCenter>
    </>
  );
};

export default AddCategory;
