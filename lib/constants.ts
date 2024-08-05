export enum CollectionColors {
  "Ocean Blue" = "bg-gradient-to-r from-blue-500 to-cyan-500",
  "Forest Green" = "bg-gradient-to-r from-green-500 to-lightgreen-500",
  "Sunset Red" = "bg-gradient-to-r from-red-500 to-orange-500",
  "Sunset Orange" = "bg-gradient-to-r from-yellow-500 to-red-500",
  "Dusk Purple" = "bg-gradient-to-r from-purple-500 to-indigo-500",
  "Sand Brown" = "bg-gradient-to-r from-amber-500 to-brown-500",
  "Cloudy Gray" = "bg-gradient-to-r from-gray-500 to-bluegray-500",
}

export type CollectionColor = keyof typeof CollectionColors