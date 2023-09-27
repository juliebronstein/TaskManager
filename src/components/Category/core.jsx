


import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import * as Yup from "yup";
import { db } from "../../firebase";

export const initialValues = {
  title: "",
  color: "",
};
export const onSubmit = async (
  values,
  actions,
  setErr,
  setLoading,
  setShow,
  uid,
  setCatergories
) => {
  setLoading(true);
  const title = values.title;
  const color = values.color;
  try {
    const categoryRef = collection(db, "category");
    const newDocRef = await addDoc(categoryRef, {
      userId: uid,
      title: title,
      color: color,
    });
    await updateDoc(newDocRef, {
      catId: newDocRef.id,
      userId: uid,
      title: title,
      color: color,
    });
    setCatergories((prevCategories) => {
      return [
        ...prevCategories,
        {
          catId: newDocRef.id,
          userId: uid,
          title: title,
          color: color,
        },
      ];
    });
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
    .min(2, "Enter at least 2 characters"),
  color: Yup.string().required("Please fill this box"),
});
