import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/users/client/components/Avatar.component';
import UserLink from '@/modules/users/client/components/UserLink';

export default function Reference({ reference }) {
  return (
    <div>
      <Avatar user={reference.userFrom} size={32} />
      <UserLink user={reference.userFrom} />
      interaction: {reference.userTo.username} {reference.hostedMe && 'hosted me'} {reference.hostedThem && 'hosted them'} {reference.met && 'met'}
      recommends: {reference.recommend}, created: {reference.created}
    </div>
  );
}

Reference.propTypes = {
  reference: PropTypes.object.isRequired
};