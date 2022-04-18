import { useEffect } from 'react';
import { authFacebook, DataSourceNames } from 'constants/dataSource';
import * as sourcePageRoute from 'constants/sourcePageRoute';

import { GrFacebook } from 'react-icons/gr';
import {
  SiFacebook,
  SiGoogleads,
  SiGooglemybusiness,
  SiInstagram,
  SiLinkedin,
  SiMicrosoft,
  SiTiktok,
  SiYoutube
} from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchConnectors } from 'redux/actions/connectors';
import { privatesRoutes } from 'routes';
import { getGoogleURL } from 'services/connectors';

function isInDevelopment(name) {
  alert(name + ' integration is in development');
}

export default function useDataSources() {
  const connectors = useSelector(state => state.Connectors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchConnectors());
  }, [dispatch, history]);

  const onClickFBAds = () => {
    const path = privatesRoutes.newSource.path + sourcePageRoute.FACEBOOK_ADS;

    if (connectors[DataSourceNames.FACEBOOK_ADS]?.accounts?.length) {
      return history.push(path + '/2');
    }

    return authFacebook(path + '/test');
  };

  const onClickGoogleMyBusiness = () => {
    if (connectors[DataSourceNames.GOOGLE]?.accounts?.length) {
      return history.push(`/app/new-source/${DataSourceNames.GOOGLE.toLowerCase()}/2`);
    }
    getGoogleURL().then(url => window.location.replace(url));
  };

  const onClickFBLeads = () => {
    if (connectors[DataSourceNames.FACEBOOK_LEADS]?.accounts?.length) {
      return history.push(`/app/new-source/facebookleads/2`);
    }
    return authFacebook('/app/new-source/facebookleads/1');
  };

  const services = [
    { icon: SiFacebook, name: DataSourceNames.FACEBOOK_ADS, label: 'Facebook Ads', onClick: onClickFBAds },
    {
      icon: SiGoogleads,
      name: DataSourceNames.GOOGLE_ADS,
      label: 'Google Ads',
      onClick: () => isInDevelopment('Google Ads')
    },
    {
      icon: SiGooglemybusiness,
      name: DataSourceNames.GOOGLE_BUSINESS,
      label: 'G. Business',
      onClick: onClickGoogleMyBusiness
    },
    { icon: GrFacebook, name: DataSourceNames.FACEBOOK_LEADS, label: 'Faceb. Leads', onClick: onClickFBLeads },
    {
      icon: SiLinkedin,
      name: DataSourceNames.LINKEDIN_ADS,
      label: 'Linkedin Ads',
      onClick: () => isInDevelopment('Linkedin Ads')
    },
    {
      icon: SiInstagram,
      name: DataSourceNames.INSTAGRAM_ADS,
      label: 'Instagram Ads',
      onClick: () => isInDevelopment('Instagram Ads')
    },
    {
      icon: SiYoutube,
      name: DataSourceNames.YOUTUBE_ADS,
      label: 'Youtube Ads',
      onClick: () => isInDevelopment('Youtube Ads')
    },
    {
      icon: SiTiktok,
      name: DataSourceNames.TIKTOK_ADS,
      label: 'Tiktok Ads',
      onClick: () => isInDevelopment('Tiktok Ads')
    },
    {
      icon: SiMicrosoft,
      name: DataSourceNames.MICROSOFT_ADS,
      label: 'Microsoft Ads',
      onClick: () => isInDevelopment('Microsoft Ads')
    }
  ];

  return services;
}
