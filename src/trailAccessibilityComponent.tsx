import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { trailDetails } from "./trailDetails.ts";
import {
    List,
    ListItem,
    ListIcon,
  } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

const loader = new Loader({
    apiKey: "",
    version: "weekly",
});

const TrailAccessibilityComponent = (props: any) => {
  const [trailAccessibility, setTrailAccessibility] = useState<any[]>([]);
  
  useEffect(() => {
    const getDirections = async () => {
      try {
        await loader.load();
        const directionsService = new window.google.maps.DirectionsService();
        const accessibilityResults: any[] = [];

        for (const trail of trailDetails) {
          const destination = new window.google.maps.LatLng(Number(trail.lat), Number(trail.lon));
          
          const request = {
            origin: props.address,
            destination: destination,
            travelMode: window.google.maps.TravelMode['TRANSIT'],
          };

          await new Promise<void>(resolve => {
            directionsService.route(request, (result, status) => {
              accessibilityResults.push({name: trail.name, status: status, result: result});
              resolve();
            });
          });
        }

        setTrailAccessibility(accessibilityResults);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    getDirections();
  }, [props.address]);

  const accessibleTrails = trailAccessibility.filter(trail => trail.status === 'OK');
  const inaccessibleTrails = trailAccessibility.filter(trail => trail.status !== 'OK');

  return (
    <div>
        <List spacing={3}>
            {accessibleTrails.map((trail) => (
                <ListItem key={trail.name}><ListIcon as={CheckIcon} color='green.500' />{trail.name} -- {trail.result.routes[0].legs[0].duration.text}</ListItem>
            ))}
            {inaccessibleTrails.map((trail) => (
                <ListItem key={trail.name}><ListIcon as={CloseIcon} color='red.500' />{trail.name}</ListItem>
            ))}
        </List>
    </div>
  );
};

export default TrailAccessibilityComponent;
