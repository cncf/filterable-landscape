import React from 'react';
import { FormGroup, FormControl, FormLabel } from 'material-ui/Form';

import CncfFilterContainer from './CncfFilterContainer';
import CommercialFilterContainer from './CommercialFilterContainer';
import OssFilterContainer from './OssFilterContainer';
import StarsFilterContainer from './StarsFilterContainer';
import CertifiedKubernetesFilterContainer from './CertifiedKubernetesFilterContainer'
import LicenseFilterContainer from './LicenseFilterContainer';
import MarketCapFilterContainer from './MarketCapFilterContainer';
import VCFunderFilterContainer from './VCFunderFilterContainer';
import CompanyFilterContainer from './CompanyFilterContainer';
import HeadquatersFilterContainer from './HeadquatersFilterContainer';
import LandscapeFilterContainer from './LandscapeFilterContainer';
const Filters = () => {
  return <div>
      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">CNCF Relation</FormLabel>
          <CncfFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Commercial Project</FormLabel>
          <CommercialFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Open Source Project</FormLabel>
          <OssFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Stars</FormLabel>
          <StarsFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Certified Kubernetes</FormLabel>
          <CertifiedKubernetesFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">License</FormLabel>
          <LicenseFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Market Cap of company</FormLabel>
          <MarketCapFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">VC Funders</FormLabel>
          <VCFunderFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Company</FormLabel>
          <CompanyFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Headquaters Location</FormLabel>
          <HeadquatersFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Landscape Section</FormLabel>
          <LandscapeFilterContainer/>
        </FormControl>
      </FormGroup>
    </div>;
}
export default Filters;
