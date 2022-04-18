import useDataDestination from 'hooks/destination';
import useDataSource from 'hooks/sources';

export default function useGetFilterFlows() {
  const servicesSource = useDataSource();
  const servicesDestination = useDataDestination();

  const recommendedServices = [
    {
      name: 'flow 1',
      source: { label: 'Source 1', name: 'GOOGLE_ADS' },
      destination: { label: 'destination 1', name: 'JSON_URL' }
    },
    {
      name: 'flow 2',
      source: { label: 'Source 2', name: 'GOOGLE_ADS' },
      destination: { label: 'destination 1', name: 'JSON_URL' }
    },
    {
      name: 'flow 3',
      source: { label: 'Source 2', name: 'GOOGLE_ADS' },
      destination: { label: 'destination 1', name: 'JSON_URL' }
    },
    {
      name: 'flow 4',
      source: { label: 'Source 2', name: 'GOOGLE_ADS' },
      destination: { label: 'destination 1', name: 'JSON_URL' }
    },
    {
      name: 'flow 5',
      source: { label: 'Source ', name: 'GOOGLE_ADS' },
      destination: { label: 'destination 1', name: 'JSON_URL' }
    }
  ];
  if (recommendedServices.length === 0) return [];

  let source = {};
  let destination = {};
  let flows = [];
  recommendedServices.forEach(serviceRecommended => {
    servicesDestination.map(destinationService => {
      if (destinationService.name === serviceRecommended.destination.name) {
        destination = { iconProps: destinationService, label: serviceRecommended.destination.label };
      }
      return false;
    });
    servicesSource.map(sourceService => {
      if (sourceService.name === serviceRecommended.source.name) {
        source = { iconProps: sourceService, label: serviceRecommended.source.label };
      }
      return false;
    });
    flows.push({ name: serviceRecommended.name, source, destination });
  });

  return flows;
}
