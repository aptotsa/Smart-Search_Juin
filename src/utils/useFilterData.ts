import IDataset from "../models/IDataset"
import { SearchType } from "../contexts/SearchContext"
import IRecord from "../models/IRecord"

const useFilterData = (dataToSearch?: IDataset, filters?: SearchType[]) => {
  if (!dataToSearch) return []

  if (!filters) return dataToSearch.records

  const check = (record: IRecord) => {
    let match: boolean[] = []

    for (const [key, value] of Object.entries(record.fields)) {
      filters.forEach((filter) => {
        if (key === filter.groupName) {
          match.push(filter.keyword === value)
        }
        match.push(false)
      })
    }

    return match.filter((v) => v).length === filters.length
  }

  const records = dataToSearch.records.filter(check)

  return records
}

export default useFilterData
