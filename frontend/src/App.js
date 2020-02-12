import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './API'; 

const App = () => {
    const [ logEntries, setLogEntries ] = useState([]);
    const [ viewport, setViewport ] = useState({
        width: '100vw',
        height: '100vh', 
        latitude: 42.0000, 
        longitude: -108.0000, 
        zoom: 4,
    });

    useEffect(() => {
        (async () => {
            const logEntries = await listLogEntries();
            setLogEntries(logEntries);
        })();
    }, []);

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/esberg/ck6jeh0hl189w1imghiv2567i"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            onViewPortChange={setViewport}
        >
            {
                logEntries.map(entry => (
                    <Marker latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-20} offsetTop={-10}>
                        <svg 
                            className="marker" 
                            style={{
                                width: `calc(1vmin * ${viewport.zoom})`,
                                height: `calc(1vmin * ${viewport.zoom})`,  
                            }}
                            viewBox="0 0 24 24" 
                            width="24" height="24" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            fill="none" 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            class="css-i6dzq1">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </Marker>
                ))
            }
        </ReactMapGL>
    );
}


export default App;