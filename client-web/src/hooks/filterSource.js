import useDataSources from 'hooks/sources';

export default function useGetFilterSouces() {
  const sourceServices = useDataSources();
  const recommendedSources = [
    {
      id: 1,
      label: 'Source 1',
      type: 'GOOGLE_ADS',
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
      label: 'Source 2',
      type: 'FACEBOOK_LEADS',
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
      label: 'Source 2',
      type: 'FACEBOOK_LEADS',
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
      label: 'Source 3',
      type: 'GOOGLE_BUSINESS',
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
  if (recommendedSources.length === 0) return [];

  let sources = [];
  let source = {};

  recommendedSources.map(recommendedSource =>
    sourceServices.map(sourceService => {
      if (sourceService.name === recommendedSource.type) {
        source = { iconProps: sourceService, ...recommendedSource };
        sources.push(source);
      }
      return false;
    })
  );

  return sources;
}
