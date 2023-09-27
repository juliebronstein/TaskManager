import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/UserContext";
import AddButton from "../AddButton";
import ModalCenter from "../../Modal";
import FormikControl from "../../form/FormikControl";
import { TaskContext } from "../../../context/TasksContext";
import { Spinner } from "react-bootstrap";
import AddCategory from "../../Category/AddCategory";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddTask = ({ editTask, setEditTask, show, setShow }) => {
   const [reinitialValues, setReinitialValues] = useState(null);
  useEffect(() => {
    if (editTask) {
      setReinitialValues({
        title: editTask.title,
        cateId: editTask.cateId,
      });
    } else setReinitialValues(null);
  }, [editTask]);
  const { currentUser } = useContext(AuthContext);
  const { categories, setTasks } = useContext(TaskContext);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleGetCategoriesOptions = async () => {
    try {
      setOptions(
        categories.map((p) => {
          return { id: p.catId, value: p.title };
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    handleGetCategoriesOptions();
  }, [categories]);

  return (
    <>
      
        <AddButton
          onClick={() => {setShow(true)
          setReinitialValues(null)}
          }
          title={"Add new"}
          className="col-10 pointer add text-center" 
          // className="col-10 text-center mt-2 pointer add-cate add"
        />
     
      <ModalCenter title={reinitialValues?`Edit: ${editTask?.title}`:"Add Task"} show={show} setShow={setShow}>
        <Formik
          initialValues={reinitialValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) =>
            onSubmit(
              values,
              actions,
              setErr,
              setLoading,
              setShow,
              setTasks,
              currentUser.uid,
              categories,
              editTask,
              setEditTask,
              setReinitialValues
            )
          }
          enableReinitialize
        >
          <Form className="row col-10 d-flex justify-content-center ms-5">
            <FormikControl
              control="select"
              options={options}
              name="cateId"
              firstItem="please choice category"
              additionalField={<AddCategory />}
            />
            <FormikControl
              control="input"
              type="text"
              name="title"
              placeholder="insert category title"
            />
            <button
              type="submit"
              className="btn submit mt-4 col-10 color-white"
            >
              {reinitialValues?"Edit":"Add"}{" "}
              {loading && (
                <Spinner animation="border" role="status" size="sm" />
              )}
            </button>
          </Form>
        </Formik>
        {err && <span className="color-war">Somthings done wrong </span>}
      </ModalCenter>
    </>
  );
};

export default AddTask;
