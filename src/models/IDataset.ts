import IFacetGroup from "./IFacetGroup"
import IParameters from "./IParameters"
import IRecord from "./IRecord"

interface IDataset {
  nhits: number
  parameters: IParameters
  records: IRecord[]
  facet_groups: IFacetGroup[]
}

export default IDataset
