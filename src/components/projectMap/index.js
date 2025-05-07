import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from '../../../public/Icon/pin.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function ProjectMap({ projects }) {
  console.log(projects)
  return (
    <MapContainer center={[17.385, 78.4867]} zoom={12} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {projects.map((p, i) => (
        <Marker key={i} position={[p.latitude, p.longitude]} >
          <Popup>
            <b>{p.name}</b><br />
            {p.price}<br />
            {p.builder}<br/>
            {p.latitude+'-'+ p.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
