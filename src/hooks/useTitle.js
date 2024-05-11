import { useState, useEffect } from "react";

export const useTitle = (newTitle) => {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = newTitle;
    };
  }, [newTitle]);

  const changeTitle = (newTitle) => setTitle(newTitle);

  return { title, changeTitle };
};
