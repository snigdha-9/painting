import { DataDestinantionNames } from 'constants/dataDestination';
import { SiAmazonaws, SiGoogleanalytics, SiGooglecloud, SiGooglesheets, SiMysql } from 'react-icons/si';
import { VscJson } from 'react-icons/vsc';

function isInDevelopment(name) {
  alert(name + ' integration is in development');
}

export default function useDataDestinations() {
  const services = [
    {
      icon: VscJson,
      name: DataDestinantionNames.JSON_URL,
      label: 'Json url',
      onClick: () => isInDevelopment('Google analytics')
    },
    {
      icon: SiMysql,
      label: 'Universal Mysql',
      name: DataDestinantionNames.MYSQL_UNIVERSAL,
      onClick: () => isInDevelopment('AWS Aurora')
    },

    {
      icon: SiGoogleanalytics,
      name: DataDestinantionNames.GOOGLE_ANALYTICS,
      label: 'Google analytics',
      onClick: () => isInDevelopment('Google analytics')
    },
    { icon: SiAmazonaws, name: '', label: 'AWS Aurora', onClick: () => isInDevelopment('AWS Aurora') },
    {
      icon: SiAmazonaws,
      name: DataDestinantionNames.AWS_RDS_SQL_Server,
      label: 'AWS RDS(SQL Server)',
      onClick: () => isInDevelopment('AWS RDS(SQL Server)')
    },
    {
      icon: SiGooglesheets,
      name: DataDestinantionNames.GOOGLE_SHEETS,
      label: 'Google sheets',
      onClick: () => isInDevelopment('Google sheets')
    },
    {
      icon: SiAmazonaws,
      name: DataDestinantionNames.AWS_RDS_MYSQL,
      label: 'AWS RDS(Mysql)',
      onClick: () => isInDevelopment('AWS RDS(Mysql')
    },
    {
      icon: SiAmazonaws,
      name: DataDestinantionNames.AMAZON_AWS,
      label: 'AMAZON AWS',
      onClick: () => isInDevelopment('AMAZON AWS')
    },
    {
      icon: SiGooglecloud,
      name: DataDestinantionNames.GOOGLE_CLOUD,
      label: 'Google cloud',
      onClick: () => isInDevelopment('Google cloud')
    }
  ];

  return services;
}
