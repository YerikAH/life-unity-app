import s3 from "aws-sdk/clients/s3.js";
import { updateUser } from "../utils";

export const subirArchivo = async (file) => {
  const conector = new s3({
    region: "",
    credentials: {
      accessKeyIf: "",
      secretAccessKey: "",
    },
  });
  try {
    const resultado = await conector.updload({
      Bucket: "",
      Body: file,
      key: file.name,
    });

    console.log(resultado);
    if (resultado.Location) {
      const data = resultado.Location;
      const response = await updateUser({
        image: data,
      });
      console.log(response);
      return resultado.Location;
    }

  } catch (error) {
    console.log(error);
  }
};
