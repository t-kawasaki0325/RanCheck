export interface IGroup {
  id: string
  name: string
}

interface IProjectsEntity {
  _id: string
  site: string
  groups: IGroup[]
  lastSearch: string
  equals: Function
}

export default IProjectsEntity
