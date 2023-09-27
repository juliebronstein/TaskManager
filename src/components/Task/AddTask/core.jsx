import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import * as Yup from "yup";

export const initialValues = {
  taskId: "",
  title: "",
  cateId: "",
  uId: "",
};
export const onSubmit = async (
  values,
  actions,
  setErr,
  setLoading,
  setShow,
  setTasks,
  uid,
  categories,
  editTask,
  setEditTask,
  setReinitialValues
) => {
  setLoading(true);
  const title = values.title;
  const cateId = values.cateId;
  const cate = categories.find((c) => c.catId === values.cateId);
  try {
    if (editTask) {
      const taskDocRef = doc(db, "task", editTask.taskId);
      if (editTask.taskId !== undefined) {
        const updatedData = {
          taskId: editTask.taskId,
          title: title,
          cateId: cateId,
          uId: editTask.uId,
          state: editTask.state,
        };
        await updateDoc(taskDocRef, updatedData);
        const newTask = {
          taskId: editTask.taskId,
          title: title,
          cateId: cateId,
          uId: editTask.uId,
          state: editTask.state,
          cateTitle: cate?.title,
          cateColor: cate?.color,
        };

        setTasks((old) => {
          const newData = [...old];
          const index = newData.findIndex((i) => i.taskId === editTask.taskId);
          newData[index] = newTask;
          return newData;
        });
      }

      setEditTask(null);
      setReinitialValues(null);
    } else {
      const categoryRef = collection(db, "task");
      const newDocRef = await addDoc(categoryRef, {
        title: title,
        cateId: cateId,
        uId: uid,
        state: "notDone",
      });
      await updateDoc(newDocRef, {
        taskId: newDocRef.id,
        title: title,
        cateId: cateId,
        uId: uid,
        state: "notDone",
      });
      setTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            taskId: newDocRef.id,
            title: title,
            cateId: cateId,
            uId: uid,
            state: "notDone",
            cateTitle: cate?.title,
            cateColor: cate?.color,
          },
        ];
      });
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    setErr(true);
    throw error;
  }
  setLoading(false);
  actions.resetForm();
  setShow(false);
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("Please fill this box")
    .min(3, "Enter at least 3 characters"),
  cateId: Yup.string().required("Please fill this box"),
});
