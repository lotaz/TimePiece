export interface IWatchModel {
  brandId: number
  id: number
  name: string
  materials: IMaterial[]
  sizes: IWatchSize[]
  watchStraps: IWatchStrap[]
}

export interface IMaterial {
  materialId: number
  materialName: string
}

export interface IWatchSize {
  sizeId: number
  sizeName: string
}

export interface IWatchStrap {
  watchStrapId: number
  watchStrapName: string
}

export interface IBrand {
  id: number
  brandName: string
}

export interface IWatchType {
  id: number
  typeName: string
}
