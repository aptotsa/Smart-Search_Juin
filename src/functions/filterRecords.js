export default function filterRecords(filter, data) {
    return new Promise((resolve) => {
        const yearsFilter = filter
            .filter((el) => el.id === "annee_tournage")
            .map(({ label }) => label);
        const typeFilter = filter
            .filter((el) => el.id === "type_tournage")
            .map(({ label }) => label);
        const ardtFilter = filter
            .filter((el) => el.id === "ardt_lieu")
            .map(({ label }) => label);

        const filtredData = data
            .filter((record) => {
                if (yearsFilter.length === 0) {
                    return true;
                }
                return yearsFilter.includes(record.fields.annee_tournage);
            })
            .filter((record) => {
                if (typeFilter.length === 0) {
                    return true;
                }
                return typeFilter.includes(record.fields.type_tournage);
            })
            .filter((record) => {
                if (ardtFilter.length === 0) {
                    return true;
                }
                return ardtFilter.includes(record.fields.ardt_lieu);
            });

        resolve(filtredData);
    });
}
