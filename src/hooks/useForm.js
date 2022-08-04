import { useState } from "react";

// lưu ý là name của input tag không được bắt đầu bằng chữ in hoa.
// Tên key truyền vào phải trùng với name của input
export const useForm = (initialInput) => {
  const [formState, setFormState] = useState(initialInput);
  return [
    formState,
    (e) => {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    },
    () => {
      setFormState(initialInput);
    },
    // Cho việc update một lượt toàn bộ các giá trị của formState,dành cho trang edit user chẳng hạn
    (updatedInput) => {
      setFormState({ ...formState, ...updatedInput });
    },
  ];
};

export const validateEmail = (email) => {
  const res =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(email);
};

export const validateVnPhoneNum = (phoneNums) => {
  const res = /(09|01[2689])+([0-9]{8})\b/g;
  return res.test(phoneNums);
};

export const validateNumberCharater = (String) => {
  const res = /^[A-Za-z0-9 -]*$/;
  return res.test(String);
};
