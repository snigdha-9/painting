export function useDataChartFlow(idSource = 1) {
  const source = {
    id: 1,
    name: 'Source 1',
    data: { label: 'Source 1' }
  };
  const destinationsFromSource = [
    {
      data: { label: 'Destination 1' }
    },
    {
      data: { label: 'Destination 2' }
    },
    {
      data: { label: 'Destination 6' }
    },
    {
      data: { label: 'Destination 7' }
    },
    {
      data: { label: 'Destination 8' }
    },
    {
      data: { label: 'Destination 3' }
    },
    {
      data: { label: 'Destination 4' }
    }
  ];

  const services = [source, ...destinationsFromSource];

  return services;
}
