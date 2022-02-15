async getLineStationsNames(lineId: string): Promise<Array<[string,string]>> {
  const res = [];
  const lineInfoRequest = await this.api.getLineDetails(lineId);
  const stationIds = lineInfoRequest.features[0].properties.ZONES_ARRET;
  for (const stationId of stationIds) {
  const stationInfoRequest = await this.api.getStationDetails(stationId);
  res.push(stationInfoRequest.features[0].properties.LIBELLE);
}
return res;
}

public async getPartialLineCoords(startStopCoords: Array<number>, endStopCoords: Array<number>, lineId: string): Promise<any> {
  const startTestArea = [];
  const endTestArea = [];
  let startIndex: string;
let endIndex: string;
const truncateByDecimalPlace = (value, numDecimalPlaces) =>
  Math.trunc(value * Math.pow(10, numDecimalPlaces)) / Math.pow(10, numDecimalPlaces);

const dataLine = await this.api.getLineDetails(lineId);
const lineCoords = dataLine.features[0].geometry.coordinates;
for (const [index, coord] of Object.entries(lineCoords[0])) {
  if (truncateByDecimalPlace(coord[0], 3) === truncateByDecimalPlace(startStopCoords[0], 3)
    && truncateByDecimalPlace(coord[1], 3) === truncateByDecimalPlace(startStopCoords[1], 3)) {
    startTestArea.push({index, coords: coord});
  } else if (truncateByDecimalPlace(coord[0], 3) === truncateByDecimalPlace(endStopCoords[0], 3)
    && truncateByDecimalPlace(coord[1], 3) === truncateByDecimalPlace(endStopCoords[1], 3)) {
    endTestArea.push({index, coords: coord});
    // grossir la recherche si rien trouvé? -> après la boucle?
  }
}
for (const item of startTestArea) {
  const dataStartCloseStation = await this.api.getStationsNearCoords(item.coords);
  for (const station of dataStartCloseStation) {
    if (station.lines.includes(lineId.replace('_', ':'))) {
      startIndex = item.index;
      break;
    }
  }
}
for (const item of endTestArea) {
  const dataEndCloseStation = await this.api.getStationsNearCoords(item.coords);
  for (const station of dataEndCloseStation) {
    if (station.lines.includes(lineId.replace('_', ':'))) {
      endIndex = item.index;
      break;
    }
  }
}
console.log(+startIndex);
console.log(+endIndex);
console.log(lineCoords);
console.log(lineCoords.join().slice(+startIndex,+endIndex));
console.log(lineCoords);
const merged = [].concat.apply([], lineCoords);
return merged.slice(startIndex, endIndex);
}
