interface IFacet {
  name: string
  count: number
  state: string
  path: string
}

interface IFacetGroup {
  name: string
  facets: IFacet[]
}

export default IFacetGroup
