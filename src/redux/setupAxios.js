import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function setupAxios(axios, store) {
    const swal = withReactContent(Swal);

    axios.interceptors.response.use(
        response => response,
        error => {
            swal.fire({
                title: "Ocorreu um erro, tente de novo",
                showConfirmButton: true,
                showCancelButton: false,
                icon: "warning"
            })
                .then(result => {
                    if (result.isConfirmed)
                        window.location.replace("/");
                });
        }
    );
}
