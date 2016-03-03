(function() {
  'use strict';

  angular
    .module('messages')
    .config(MessagesRoutes);

  /* @ngInject */
  function MessagesRoutes($stateProvider) {

    // Messages state routing
    $stateProvider.
      state('inbox', {
        url: '/messages',
        title: 'Messages',
        templateUrl: 'modules/messages/views/inbox.client.view.html',
        controller: 'InboxController',
        controllerAs: 'inbox',
        requiresAuth: true
      }).
      state('messageThread', {
        url: '/messages/:username',
        title: 'Messages',
        templateUrl: 'modules/messages/views/thread.client.view.html',
        controller: 'MessagesThreadController',
        controllerAs: 'thread',
        requiresAuth: true,
        footerHidden: true,
        resolve: {
          // A string value resolves to a service
          UserProfilesService: 'UserProfilesService',
          SettingsService: 'SettingsService',

          userTo: function(UserProfilesService, $stateParams) {
            return UserProfilesService.get({
              username: $stateParams.username
            });
          },
          appSettings: function(SettingsService) {
            return SettingsService.get();
          }
        }
      });
  }

})();
