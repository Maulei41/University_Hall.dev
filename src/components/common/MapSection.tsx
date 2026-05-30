import React, { useRef, useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const UH_COORDS: [number, number] = [114.135, 22.2635] // [lng, lat]
const ZOOM = 16

const MapSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: UH_COORDS,
      zoom: ZOOM,
      attributionControl: {
        compact: true,
      },
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')

    map.on('load', () => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        '<strong style="font-family:serif;font-size:14px;">University Hall, HKU</strong><br />' +
          '<span style="font-family:sans-serif;font-size:12px;">Pokfulam, Hong Kong</span>'
      )

      new maplibregl.Marker({ color: '#C9A84C' })
        .setLngLat(UH_COORDS)
        .setPopup(popup)
        .addTo(map)
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-72 lg:h-full min-h-[300px] rounded-card overflow-hidden border border-brand-border">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  )
}

export default MapSection
