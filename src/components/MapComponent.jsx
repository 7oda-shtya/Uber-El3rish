import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

// مركز افتراضي للخريطة عند التحميل
const EL_ARISH_CENTER = [31.1285, 33.8015]

// خرائط القواعد المتاحة (مصادر البلاطات لكل تصميم)
const MAP_STYLES = {
  standard: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenStreetMap' },
  satellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: 'Tiles &copy; Esri' },
  terrain: { url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', attribution: '&copy; OpenTopoMap' },
  dark: { url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', attribution: '&copy; CARTO' },
}

// ينشئ أيقونة ماركر بسيطة قابلة للتخصيص
const pinIcon = (color, label) =>
  L.divIcon({
    className: '',
    html: `<div class="map-pin" style="background:${color}">${label ?? ''}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  })

// مكوّن داخلي يلتقط نقرات الخريطة ويعيدها للـ caller عبر `onPick`
const ClickCapture = ({ onPick }) => {
  useMapEvents({
    click: (e) => onPick && onPick(e.latlng),
  })
  return null
}

// يضبط مدى الخريطة ليتناسب مع مجموعة نقاط معطاة
const FitToPoints = ({ points }) => {
  const map = useMap()
  useEffect(() => {
    if (!points || points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 15)
      return
    }
    map.fitBounds(points, { padding: [60, 60] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(points)])
  return null
}

/**
 * MapComponent
 * props:
 * - startPin: { lat, lng, name } أو null
 * - endPin: { lat, lng, name } أو null
 * - waypoints: مصفوفة نقاط بين البداية والنهاية
 * - routeCoords: مصفوفة إحداثيات لرسم المسار على الخريطة
 * - pickTarget: عند وجود قيمة غير null يصبح الكورسور لاختيار نقاط بالنقر
 * - onPick: دالة تستقبل latlng عند النقر (تستخدم مع `pickTarget`)
 * - mapStyle: اسم تصميم الخريطة
 */
const MapComponent = ({ startPin, endPin, waypoints = [], routeCoords, pickTarget, onPick, mapStyle = 'dark' }) => {
  const layer = MAP_STYLES[mapStyle] || MAP_STYLES.dark
  const boundsPoints = [startPin, ...waypoints, endPin].filter(Boolean).map((p) => [p.lat, p.lng])

  return (
    <div style={{ height: '100%', width: '100%' }} className={`relative z-0 ${pickTarget ? 'cursor-crosshair' : ''}`}>
      <MapContainer center={EL_ARISH_CENTER} zoom={14} zoomControl={false} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution={layer.attribution} url={layer.url} />

        {boundsPoints.length > 0 && <FitToPoints points={boundsPoints} />}

        {routeCoords && routeCoords.length > 1 && (
          <Polyline positions={routeCoords} pathOptions={{ color: '#10b981', weight: 5, opacity: 0.85 }} />
        )}

        {startPin && <Marker position={[startPin.lat, startPin.lng]} icon={pinIcon('#10b981')} />}

        {waypoints.map((wp, i) => (
          <Marker key={i} position={[wp.lat, wp.lng]} icon={pinIcon('#3b82f6', i + 1)} />
        ))}

        {endPin && <Marker position={[endPin.lat, endPin.lng]} icon={pinIcon('#ef4444')} />}

        {pickTarget && <ClickCapture onPick={onPick} />}
      </MapContainer>
    </div>
  )
}

export default MapComponent
