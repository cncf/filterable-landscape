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
import HeadquartersFilterContainer from './HeadquartersFilterContainer';
import LandscapeFilterContainer from './LandscapeFilterContainer';
import fields from '../types/fields';
const Filters = () => {
  return <div>
      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.cncfHostedProject.label}</FormLabel>
          <CncfFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.commercial.label}</FormLabel>
          <CommercialFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.oss.label}</FormLabel>
          <OssFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.stars.label}</FormLabel>
          <StarsFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row style={{}}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.certifiedKubernetes.label}</FormLabel>
          <CertifiedKubernetesFilterContainer/>
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.license.label}</FormLabel>
          <LicenseFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.marketCap.label}</FormLabel>
          <MarketCapFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.vcFunder.label}</FormLabel>
          <VCFunderFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.company.label}</FormLabel>
          <CompanyFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.headquarters.label}</FormLabel>
          <HeadquartersFilterContainer />
        </FormControl>
      </FormGroup>

      <FormGroup row>
        <FormControl component="fieldset">
          <FormLabel component="legend">{fields.landscape.label}</FormLabel>
          <LandscapeFilterContainer/>
        </FormControl>
      </FormGroup>
    </div>;
}
export default Filters;
