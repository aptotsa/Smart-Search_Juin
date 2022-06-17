import SearchField from "../../components/SearchField"

import data from "../../api/opendata.paris.fr.json"

const FilterSection = () => {
  return (
    <div>
      <SearchField id="search" label="Search" options={data.parameters.facet} />
    </div>
  )
}

export default FilterSection
