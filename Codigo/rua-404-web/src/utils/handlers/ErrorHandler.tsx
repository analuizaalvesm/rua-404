import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;

    if (Array.isArray(err?.data)) {
      err.data.forEach((e: any) => {
        toast.error(`Erro ao realizar login: ${e}`, { position: "top-center" });
      });
    } else if (typeof err?.data.errors === "object") {
      for (const e in err?.data.errors) {
        toast.error(`Erro ao realizar login: ${[e][0]}`, {
          position: "top-center",
        });
      }
    } else if (err?.data) {
      toast.error(`Erro ao realizar login: ${err.data}`, {
        position: "top-center",
      });
    } else if (err?.status == 401) {
      toast.error(`Erro ao realizar login: NÃO AUTORIZADO.`, {
        position: "top-center",
      });
      window.history.pushState({}, "Login", "/login");
    } else if (err) {
      toast.error(`Erro ao realizar login: ${err}`, { position: "top-center" });
    }
  }
};
