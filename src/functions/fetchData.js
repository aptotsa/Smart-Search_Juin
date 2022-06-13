import axios from "axios";

export default function fetchData() {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `https://opendata.paris.fr/api/records/1.0/search/?dataset=lieux-de-tournage-a-paris&q=&facet=annee_tournage&facet=type_tournage&facet=nom_tournage&facet=nom_realisateur&facet=ardt_lieu&rows=10000 `
            )
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
