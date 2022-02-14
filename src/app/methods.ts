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
