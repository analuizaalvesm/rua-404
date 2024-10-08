import axios from "axios"

export const handleError = (error: any) => {
    if(axios.isAxiosError(error)) {
        var err = error.response;

        if(Array.isArray(err?.data)) {
            err.data.forEach((e: any) => {
               window.alert(e);
            });
        } else if(typeof err?.data.errors === 'object') {
            for (const e in err?.data.errors) {
                window.alert(err.data.errors[e][0]);
            }
        } else if(err?.data) {
            window.alert(err.data);
        } else if(err?.status == 401) {
            window.alert("Unauthorized");
            window.history.pushState({}, 'Login', '/login');
        } else if(err) {
            window.alert(err?.data);
        }
    }
}