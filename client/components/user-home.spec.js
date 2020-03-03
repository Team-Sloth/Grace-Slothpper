/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserHome} from './user-home';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('UserHome', () => {
  let userHome;

  beforeEach(() => {
    userHome = shallow(<UserHome user={{email: 'cody@email.com', cart: []}} />);
  });

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });
});
