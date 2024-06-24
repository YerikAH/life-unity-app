import { useState, useEffect } from "react";

export const useTitle = (newTitle) => {
  const defaultTitle = document.title;
  const [title, setTitle] = useState(newTitle);

  const changeTitle = (newTitle) => {
    setTitle(newTitle);
    document.title = newTitle;
  };

  useEffect(() => {
    changeTitle(newTitle);
    return () => {
      document.title = defaultTitle;
    };
  }, [newTitle]);

  return { title, changeTitle };
};
