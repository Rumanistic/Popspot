import { useEffect } from "react";

function KakaoMap({lat, lon}) {
    useEffect(() => {
        const container =document.getElementById('map');
        const options = {
           center: new window.kakao.maps.LatLng(lat, lon),
           level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
           position: new window.kakao.maps.LatLng(lat, lon),
        });

        marker.setMap(map);
        
  },[]);
  return (
    <div
                id="map"
                style={{
                    width: '100%',
                    height: '350px',
                    marginTop: '10px',
                }}
            ></div>
  )
}
export default KakaoMap;