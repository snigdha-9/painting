import useDataDestinations from 'hooks/destination';

export default function useGetFilterDestinations() {
  const destinationServices = useDataDestinations();
  const recommendedDestinations = [
    {
      id: 1,
      label: 'Destination 1',
      type: 'AMAZON_AWS',
      dateUpdated: new Date().toLocaleDateString('br-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    {
      id: 2,
      label: 'Destination 3',
      type: 'JSON_URL',
      dateUpdated: new Date().toLocaleDateString('br-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    {
      id: 4,
      label: 'Destination 3',
      type: 'JSON_URL',
      dateUpdated: new Date().toLocaleDateString('br-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    {
      id: 3,
      label: 'Destination 2',
      type: 'JSON_URL',
      dateUpdated: new Date().toLocaleDateString('br-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  ];
  if (recommendedDestinations.length === 0) return [];
  let destinations = [];
  let destination = {};
  recommendedDestinations.map(itemDestination =>
    destinationServices.map(destinationService => {
      if (destinationService.name === itemDestination.type) {
        destination = { iconProps: destinationService, ...itemDestination };
        destinations.push(destination);
      }
      return false;
    })
  );

  return destinations;
}
