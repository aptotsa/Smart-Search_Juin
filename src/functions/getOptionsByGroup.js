export default function getOptionsByGroup(facetGroups) {
    if (facetGroups.length > 0) {
        let yearsOptions = [];
        let typeOptions = [];
        let ardtOptions = [];

        const yearFacetGroup = facetGroups.find(
            ({ name }) => name === "annee_tournage"
        );
        yearsOptions = yearFacetGroup.facets.map(({ name }) => ({
            id: "annee_tournage",
            label: name,
        }));

        const typeFacetGroup = facetGroups.find(
            ({ name }) => name === "type_tournage"
        );
        typeOptions = typeFacetGroup.facets.map(({ name }) => ({
            id: "type_tournage",
            label: name,
        }));

        const ardtFacetGroup = facetGroups.find(
            ({ name }) => name === "ardt_lieu"
        );
        ardtOptions = ardtFacetGroup.facets.map(({ name }) => ({
            id: "ardt_lieu",
            label: name,
        }));

        return [...yearsOptions, ...typeOptions, ...ardtOptions];
    }
    return [];
}
